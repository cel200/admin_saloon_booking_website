"use client"
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Clock, X } from 'lucide-react';
import Table from '../Table';
import './ServiceList.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService, listSectionByGender, listServices, updateService } from '@/store/adminThunk';

export default function ServiceList({ services }) {
    const headers = ['Service', 'Duration', 'Price', 'Category'];
    const dispatch = useDispatch();
    const { listServiceData, listServiceLoading } = useSelector((state) => state.listService);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [editForm, setEditForm] = useState({
        serviceName: '',
        duration: '',
        price: '',
        audience: '',
        section: '',
        isfeatured: '',
    });

    const { listSectionByGenderData } = useSelector((state) => state.listSectionByGender);

    const categoryOptions = Array.isArray(listSectionByGenderData)
        ? listSectionByGenderData
        : Array.isArray(listSectionByGenderData?.data)
            ? listSectionByGenderData.data
            : [];

    useEffect(() => {
        dispatch(listServices());
    }, [dispatch]);

    const openEditModal = (service) => {
        const selectedAudience =
            service?.audience ||
            service?.section?.gender ||
            service?.section?.audience ||
            '';
        const selectedSection =
            service?.section?._id ||
            service?.section?.id ||
            service?.section ||
            '';

        if (selectedAudience) {
            dispatch(listSectionByGender({ gender: selectedAudience }));
        }
        setSelectedServiceId(service?._id || service?.id || null);
        const rawFeatured =
            service?.isFeatured ??
            service?.isfeatured ??
            service?.featured ??
            '';
        const selectedFeatured =
            rawFeatured === true
                ? 'true'
                : rawFeatured === false
                    ? 'false'
                    : rawFeatured === 'Yes'
                        ? 'true'
                        : rawFeatured === 'No'
                            ? 'false'
                            : String(rawFeatured || '');
        setEditForm({
            serviceName: service.serviceName || '',
            duration: service.duration || '',
            price: service.price || '',
            audience: selectedAudience,
            section: selectedSection,
            isfeatured: selectedFeatured,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedServiceId(null);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditAudienceChange = (event) => {
        const selectedAudience = event.target.value;
        dispatch(listSectionByGender({ gender: selectedAudience }));
        setEditForm((prev) => ({
            ...prev,
            audience: selectedAudience,
            section: '',
        }));
    };

    const handleEditCategoryChange = (event) => {
        const selectedSectionId = event.target.value;
        setEditForm((prev) => ({
            ...prev,
            section: selectedSectionId,
        }));
    };
    async function handleDeleteService(service){
        try {
            await dispatch(deleteService(service._id)).unwrap();
            dispatch(listServices());
        } catch (error) {
            console.log(error);
        }
    }
    const { updateServiceLoading } = useSelector((state) => state.updateService);

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await dispatch(updateService({
                id: selectedServiceId,
                serviceName: editForm.serviceName,
                duration: editForm.duration,
                price: Number(editForm.price),
                audience: editForm.audience,
                section: editForm.section,
                isFeatured: editForm.isfeatured === 'true',
            })).unwrap();

            dispatch(listServices());
            alert(response?.message || 'Service updated successfully.');
            closeEditModal();
        } catch (error) {
            alert('Failed to update service.');
        }
    };

    const renderRow = (service) => (
        <>
            <td className="font-medium">{service.serviceName}</td>
            <td className="text-secondary">
                <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {service.duration} min
                </div>
            </td>
            <td className="text-accent font-bold">{service.price}</td>
            <td>
                <span className="badge-category">{service.section?.name}</span>
            </td>
        </>
    );

    const renderActions = (service) => (
        <div className="flex gap-2">
            <button className="icon-btn-sm edit" onClick={() => openEditModal(service)}>
                <Edit2 size={16} />
            </button>
            <button className="icon-btn-sm delete"><Trash2 size={16}  onClick={()=>handleDeleteService(service)}/></button>
        </div>
    );

    return (
        <>
            <div className="service-list-wrapper">
                <Table
                    headers={headers}
                    data={listServiceData?.data}
                    renderRow={renderRow}
                    actions={renderActions}
                />
            </div>

            {isEditModalOpen && (
                <div className="service-edit-modal-overlay" onClick={closeEditModal}>
                    <div className="service-edit-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="service-edit-modal-header">
                            <h3>Edit Service</h3>
                            <button
                                className="service-edit-modal-close"
                                onClick={closeEditModal}
                                aria-label="Close edit modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="service-edit-modal-form" onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="edit-serviceName">Service Name</label>
                                <input
                                    id="edit-serviceName"
                                    name="serviceName"
                                    type="text"
                                    value={editForm.serviceName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-duration">Duration</label>
                                <input
                                    id="edit-duration"
                                    name="duration"
                                    type="text"
                                    value={editForm.duration}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-price">Price</label>
                                <input
                                    id="edit-price"
                                    name="price"
                                    type="text"
                                    value={editForm.price}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-audience">Audience</label>
                                <select
                                    id="edit-audience"
                                    name="audience"
                                    value={editForm.audience}
                                    onChange={handleEditAudienceChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select audience
                                    </option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-section">Category</label>
                                <select
                                    id="edit-section"
                                    name="section"
                                    value={editForm.section}
                                    onChange={handleEditCategoryChange}
                                    disabled={!editForm.audience || categoryOptions.length === 0}
                                    required
                                >
                                    <option value="" disabled>
                                        Select category
                                    </option>
                                    {categoryOptions.map((section) => (
                                        <option
                                            key={section.id || section._id}
                                            value={section.id || section._id}
                                        >
                                            {section.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-isfeatured">Is Featured</label>
                                <select
                                    id="edit-isfeatured"
                                    name="isfeatured"
                                    value={editForm.isfeatured}
                                    onChange={handleEditChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select option
                                    </option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="service-edit-modal-actions">
                                <button type="button" className="btn btn-ghost" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {updateServiceLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
