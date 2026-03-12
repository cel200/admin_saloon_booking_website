"use client"
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Clock, X } from 'lucide-react';
import Table from '../Table';
import './ServiceList.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService, listServices, updateService } from '@/store/adminThunk';

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
        category: '',
    });

    useEffect(() => {
        dispatch(listServices());
    }, [dispatch]);

    const openEditModal = (service) => {
        setSelectedServiceId(service?._id || service?.id || null);
        setEditForm({
            serviceName: service.serviceName || '',
            duration: service.duration || '',
            price: service.price || '',
            category: service.category || '',
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
                category: editForm.category,
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
                                <label htmlFor="edit-category">Category</label>
                                <input
                                    id="edit-category"
                                    name="category"
                                    type="text"
                                    value={editForm.category}
                                    onChange={handleEditChange}
                                    required
                                />
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
