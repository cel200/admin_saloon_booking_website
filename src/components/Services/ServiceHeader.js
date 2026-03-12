"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import "./ServiceHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { addService, listSectionByGender, listServices } from "@/store/adminThunk";

const initialForm = {
  serviceName: "",
  image: null,
  description:"",
  duration: "",
  price: "",
  section: "",
  audience: "",
};

export default function ServiceHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const dispatch = useDispatch();
  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialForm);
  };

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };
  const { listSectionByGenderData } = useSelector(
    (state) => state.listSectionByGender,
  );

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
      section: "",
    }));
  };
  const { addServiceData, addServiceLoading } = useSelector(
    (state) => state.addService,
  );
  console.log("addServiceData", addServiceData);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = new FormData();
      payload.append("serviceName", formData.serviceName);
      payload.append("duration", formData.duration);
        payload.append("description", formData.description);
      payload.append("price", String(Number(formData.price)));
      payload.append("section", formData.section);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      const response = await dispatch(
        addService(payload),
      ).unwrap();

      // ✅ use API response directly
      alert(response?.message || "Service added successfully.");

      dispatch(listServices());
      handleCloseModal();
    } catch (error) {
      alert(error?.message || "Failed to add service. Please try again.");
    }
  };

  return (
    <>
      <div className="service-header animate-fade-in">
        <div className="header-content">
          <h2 className="text-xl font-bold text-primary mb-1">Services</h2>
          <p>Manage salon services and pricing.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {isModalOpen && (
        <div className="service-modal-overlay" onClick={handleCloseModal}>
          <div
            className="service-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="service-modal-header">
              <h3>Add New Service</h3>
              <button
                className="service-modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="service-modal-form">
              <div className="form-group">
                <label htmlFor="serviceName">Service Name</label>
                <input
                  id="serviceName"
                  name="serviceName"
                  type="text"
                  value={formData.serviceName}
                  onChange={handleChange}
                  placeholder="e.g. Hair Cut"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleChange}
                />
              </div>
               <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter your description"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 45 min"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1200"
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
                  onChange={handleChange}
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
              <div className="service-modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
