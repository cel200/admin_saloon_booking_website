"use client"
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './StaffHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { listSectionByGender, listStaffs, registerStaff } from '@/store/adminThunk';

export default function StaffHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNo: '',
        email: '',
        experience: '',
        section: '',
        audience: '',
        specialization: '',
    });

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            fullName: '',
            mobileNo: '',
            email: '',
            experience: '',
            section: '',
            audience: '',
            specialization: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { listSectionByGenderData } = useSelector((state) => state.listSectionByGender);
    const categoryOptions = Array.isArray(listSectionByGenderData)
        ? listSectionByGenderData
        : Array.isArray(listSectionByGenderData?.data)
            ? listSectionByGenderData.data
            : [];

    const handleAudienceChange = (event) => {
        const selectedAudience = event.target.value;
        dispatch(listSectionByGender({ gender: selectedAudience }));
        setFormData((prev) => ({
            ...prev,
            audience: selectedAudience,
            section: '',
            specialization: '',
        }));
    };

    const handleCategoryChange = (event) => {
        const selectedSectionId = event.target.value;
        const selectedCategory = categoryOptions.find(
            (section) => String(section.id || section._id) === String(selectedSectionId),
        );

        setFormData((prev) => ({
            ...prev,
            section: selectedSectionId,
            specialization: selectedCategory?.name || '',
        }));
    };

  const { registerStaffData, registerStaffLoading } = useSelector((state) => state.registerStaff);
  console.log("registerStaffData",registerStaffData)
   const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await dispatch(
      registerStaff({
        fullName: formData?.fullName,
        email: formData?.email,
        mobileNo: formData?.mobileNo,
        experience: formData?.experience,
        audience: formData?.audience,
        section: formData?.section,
        specialization: formData?.specialization,
      })
    ).unwrap();

    // ✅ response is the API success payload
    if (response?.message) {
      alert(response.message);
    }

    dispatch(listStaffs());
    handleCloseModal();

  } catch (error) {
    alert(error?.message || "Failed to add staff. Please try again.");
  }
};


    return (
        <>
            <div className="staff-header animate-fade-in">
                <div className="header-content">
                    <h2 className="text-xl font-bold text-primary mb-1">Staff Management</h2>
                    <p>Manage your team members and their schedules.</p>
                </div>
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    <Plus size={18} />
                    Add Staff
                </button>
            </div>

            {isModalOpen && (
                <div className="staff-modal-overlay" onClick={handleCloseModal}>
                    <div className="staff-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="staff-modal-header">
                            <h3>Add New Staff</h3>
                            <button className="staff-modal-close" onClick={handleCloseModal} aria-label="Close modal">
                                <X size={18} />
                            </button>
                        </div>

                        <form className="staff-modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobileNo">Mobile Number</label>
                                <input
                                    id="mobileNo"
                                    name="mobileNo"
                                    type="text"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="experience">Experience</label>
                                <input
                                    id="experience"
                                    name="experience"
                                    type="text"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="e.g. 3 years"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="audience">Audience</label>
                                <select
                                    id="audience"
                                    name="audience"
                                    value={formData.audience}
                                    onChange={handleAudienceChange}
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
                                <label htmlFor="section">Category</label>
                                <select
                                    id="section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleCategoryChange}
                                    disabled={!formData.audience || categoryOptions.length === 0}
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

                            <div className="staff-modal-actions">
                                <button type="button" className="btn btn-ghost" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
