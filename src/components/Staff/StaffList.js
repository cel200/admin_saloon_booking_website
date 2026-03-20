"use client"
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Star, X } from 'lucide-react';
import Table from '../Table';
import './StaffList.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff, listSectionByGender, listStaffs, updateStaff } from '@/store/adminThunk';

export default function StaffList() {
    const headers = ['Name', 'Mobile Number', 'Email', 'Experience', 'Specialization',];
    const dispatch = useDispatch();
    const { listStaffsData } = useSelector((state) => state.listStaffs);
    const { listSectionByGenderData } = useSelector((state) => state.listSectionByGender);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [editForm, setEditForm] = useState({
        fullName: '',
        mobileNo: '',
        email: '',
        experience: '',
        audience: '',
        section: '',
        specialization: '',
       
    });

    const categoryOptions = Array.isArray(listSectionByGenderData)
        ? listSectionByGenderData
        : Array.isArray(listSectionByGenderData?.data)
            ? listSectionByGenderData.data
            : [];

    useEffect(() => {
        dispatch(listStaffs());
    }, [dispatch]);
     
     async function handleDeleteStaff (member){
       try {
           await dispatch(deleteStaff(member._id)).unwrap();
           dispatch(listStaffs());
       } catch (error) {
           console.log(error);
       }
     }
    const openEditModal = (member) => {
        const selectedAudience = member?.audience || '';
        const selectedSection = member?.section?._id || member?.section?.id || member?.section || '';

        if (selectedAudience) {
            dispatch(listSectionByGender({ gender: selectedAudience }));
        }

        setSelectedStaffId(member?._id || member?.id || null);
        setEditForm({
            fullName: member?.fullName || '',
            mobileNo: member?.mobileNo || '',
            email: member?.email || '',
            experience: member?.experience || '',
            audience: selectedAudience,
            section: selectedSection,
            specialization: member?.specialization || '',
            status: member?.status || 'Available',
            rating: member?.rating || '',
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedStaffId(null);
        setIsEditModalOpen(false);
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
        specialization: '',
    }));
};

const handleEditCategoryChange = (event) => {
    const selectedSectionId = event.target.value;
    const selectedCategory = categoryOptions.find(
        (section) => String(section.id || section._id) === String(selectedSectionId),
    );

    setEditForm((prev) => ({
        ...prev,
        section: selectedSectionId,
        specialization: selectedCategory?.name || '',
    }));
};

const handleEditSubmit = async (event) => {
    event.preventDefault();   // ✅ first line

    try {
        await dispatch(
            updateStaff({
                id: selectedStaffId,
                fullName: editForm?.fullName || '',
                mobileNo: editForm?.mobileNo || '',
                email: editForm?.email || '',
                experience: editForm?.experience || '',
                audience: editForm?.audience || '',
                section: editForm?.section || '',
                specialization: editForm?.specialization || '',
                status: editForm?.status || 'Available',
                rating: editForm?.rating || '',
            })
        ).unwrap();

        dispatch(listStaffs());
        closeEditModal();   // ✅ move inside try
    } catch (error) {
        console.log(error);
    }
};


    const renderRow = (member) => (
        <>
            <td>
                <div className="user-cell">
                    <div className="avatar-sm">{member?.fullName?.charAt(0) || '-'}</div>
                    <div>
                        <div className="font-medium">{member?.fullName || '-'}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-secondary">{member?.mobileNo || '-'}</span>
            </td>
            <td>
                <span className="badge-spec">{member?.email || '-'}</span>
            </td>
            <td>
                <span className="badge-spec">{member?.experience || '-'}</span>
            </td>
            <td>
                <span className="badge-spec">{member?.specialization || '-'}</span>
            </td>
            {/* <td>
                <span className={`status-dot ${member?.status === 'Available' ? 'online' : member?.status === 'Busy' ? 'busy' : 'offline'}`} />
                {member?.status || 'Offline'}
            </td>
            <td>
                <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{member?.rating ?? '-'}</span>
                </div>
            </td> */}
        </>
    );

    const renderActions = (member) => (
        <div className="flex gap-2">
            <button className="icon-btn-sm edit" onClick={() => openEditModal(member)} aria-label="Edit staff">
                <Edit2 size={16} />
            </button>
            <button className="icon-btn-sm delete" aria-label="Delete staff" onClick={()=> handleDeleteStaff(member)}>
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <div className="staff-list-wrapper">
                <Table
                    headers={headers}
                    data={listStaffsData?.data}
                    renderRow={renderRow}
                    actions={renderActions}
                />
            </div>

            {isEditModalOpen && (
                <div className="staff-edit-modal-overlay" onClick={closeEditModal}>
                    <div className="staff-edit-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="staff-edit-modal-header">
                            <h3>Edit Staff</h3>
                            <button className="staff-edit-modal-close" onClick={closeEditModal} aria-label="Close edit modal">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="staff-edit-modal-form" onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="edit-fullName">Full Name</label>
                                <input
                                    id="edit-fullName"
                                    name="fullName"
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-mobileNo">Mobile Number</label>
                                <input
                                    id="edit-mobileNo"
                                    name="mobileNo"
                                    type="text"
                                    value={editForm.mobileNo}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-email">Email</label>
                                <input
                                    id="edit-email"
                                    name="email"
                                    type="email"
                                    value={editForm.email}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-experience">Experience</label>
                                <input
                                    id="edit-experience"
                                    name="experience"
                                    type="text"
                                    value={editForm.experience}
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
                                <label htmlFor="edit-status">Status</label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    value={editForm.status}
                                    onChange={handleEditChange}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-rating">Rating</label>
                                <input
                                    id="edit-rating"
                                    name="rating"
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={editForm.rating}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="staff-edit-modal-actions">
                                <button type="button" className="btn btn-ghost" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" data-staff-id={selectedStaffId || ''}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
