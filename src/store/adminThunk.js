import api from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/login", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


export const listUsers = createAsyncThunk(
  "auth/getUser",
  async (data) => {
    const res = await api.get("/admin/getUser", data);
    return res.data;
  }
);

export const listStaffs = createAsyncThunk(
  "auth/getStaff",
  async (data) => {
    const res = await api.post("/admin/getStaff", data);
    return res.data;
  }
);

export const listServices = createAsyncThunk(
  "auth/listService",
  async (data) => {
    const res = await api.post("/admin/listService", data);
    return res.data;
  }
);

export const addService = createAsyncThunk(
  "auth/addService",
  async (data) => {
    const res = await api.post("/admin/addService", data);
    return res.data;
  }
);
export const updateService = createAsyncThunk(
  "auth/updateService",
  async (data) => {
    const res = await api.post("/admin/updateService", data);
    return res.data;
  }
);
export const registerStaff = createAsyncThunk(
  "auth/registerStaff",
  async (data) => {
    const res = await api.post("/admin/registerStaff", data);
    return res.data;
  }
);
export const deleteStaff = createAsyncThunk(
  "staff/delete",
  async (id) => {
    const res = await api.delete("/admin/deleteStaff", {
      data: { id },   // ✅ VERY IMPORTANT
    });
    return res.data;
  }
);
export const updateStaff = createAsyncThunk(
  "auth/updateStaff",
  async (data) => {
    const res = await api.put("/admin/updateStaff", data);
    return res.data;
  }
);
export const deleteService = createAsyncThunk(
  "staff/deleteService",
  async (id) => {
    const res = await api.delete("/admin/deleteService", {
      data: { id },   // ✅ VERY IMPORTANT
    });
    return res.data;
  }
);
export const updateSettings = createAsyncThunk(
  "auth/updateSettings",
  async (data) => {
    const res = await api.put("/admin/updateSettings", data);
    return res.data;
  }
);

export const getSettings = createAsyncThunk(
  "auth/getSaloonDetails",
  async (data) => {
    const res = await api.get("/admin/getSaloonDetails", data);
    return res.data;
  }
);
export const listSectionByGender = createAsyncThunk(
  "auth/listGender",
  async (data) => {
    const res = await api.post("/admin/gender", data);
    return res.data;
  }
);
export const getDashboardStats = createAsyncThunk(
  "auth/getDashboardStats",
  async (data) => {
    const res = await api.get("/admin/dashboard", data);
    return res.data;
  }
);
export const getNotificationForAdmin = createAsyncThunk(
  "auth/getNotificationForAdmin",
  async (data) => {
    const res = await api.post("/admin/admin-notification", data);
    return res.data;
  }
);