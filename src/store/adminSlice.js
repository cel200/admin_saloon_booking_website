import { addService, deleteService, deleteStaff, getDashboardStats, getNotificationForAdmin, getSettings, listSectionByGender, listServices, listStaffs, listUsers, loginUser, registerStaff, updateService, updateSettings, updateStaff } from "./adminThunk";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const listUserSlice = createSlice({
  name: "listUser",
  initialState: {
    listUserData: null,
    listUserLoading: false,
    listUserError: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.listUserLoading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.listUserLoading = false;
        state.listUserData = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.listUserLoading = false;
        state.listUserError = action.error.message;
      });
  },
});
const listStaffsSlice = createSlice({
  name: "listStaffs",
  initialState: {
    listStaffsData: null,
    listStaffsLoading: false,
    listStaffsError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(listStaffs.pending, (state) => {
        state.listStaffsLoading = true;
      })
      .addCase(listStaffs.fulfilled, (state, action) => {
        state.listStaffsLoading = false;
        state.listStaffsData = action.payload;
      })
      .addCase(listStaffs.rejected, (state, action) => {
        state.listStaffsLoading = false;
        state.listStaffsError = action.error.message;
      });
  },
});

const listServiceSlice = createSlice({
  name: "listService",
  initialState: {
    listServiceData: null,
    listServiceLoading: false,
    listServiceError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(listServices.pending, (state) => {
        state.listServiceLoading = true;
      })
      .addCase(listServices.fulfilled, (state, action) => {
        state.listServiceLoading = false;
        state.listServiceData = action.payload;
      })
      .addCase(listServices.rejected, (state, action) => {
        state.listServiceLoading = false;
        state.listServiceError = action.error.message;
      });
  },
});
const addServiceSlice = createSlice({
  name: "addService",
  initialState: {
    addServiceData: null,
   addServiceLoading: false,
    addServiceError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.addServiceLoading = true;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.addServiceLoading = false;
        state.addServiceData = action.payload;
      })
      .addCase(addService.rejected, (state, action) => {
        state.addServiceLoading = false;
        state.addServiceError = action.error.message;
      });
  },
});
const updateServiceSlice = createSlice({
  name: "addService",
  initialState: {
   updateServiceData: null,
   updateServiceLoading: false,
    updateServiceError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(updateService.pending, (state) => {
        state.updateServiceLoading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.updateServiceLoading = false;
        state.updateServiceData = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.updateServiceLoading = false;
        state.updateServiceError = action.error.message;
      });
  },
});

const registerStaffSlice = createSlice({
  name: "registerStaff",
  initialState: {
   registerStaffData: null,
   registerStaffLoading: false,
   registerStaffError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(registerStaff.pending, (state) => {
        state.registerStaffLoading = true;
      })
      .addCase(registerStaff.fulfilled, (state, action) => {
        state.registerStaffLoading = false;
        state.registerStaffData = action.payload;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.registerStaffLoading = false;
        state.registerStaffError = action.error.message;
      });
  },
});

const deleteStaffSlice = createSlice({
  name: "deleteStaff",
  initialState: {
   deleteStaffData: null,
   deleteStaffLoading: false,
   deleteStaffError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(deleteStaff.pending, (state) => {
        state.deleteStaffLoading = true;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.deleteStaffLoading = false;
        state.deleteStaffData = action.payload;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.deleteStaffLoading = false;
        state.deleteStaffError = action.error.message;
      });
  },
});

const updateStaffSlice = createSlice({
  name: "updateStaff",
  initialState: {
    updateStaffData: null,
   updateStaffLoading: false,
    updateStaffError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( updateStaff.pending, (state) => {
        state.updateStaffLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.updateStaffLoading = false;
        state.updateStaffData = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.updateStaffLoading = false;
        state.updateStaffError = action.error.message;
      });
  },
});

const deleteServiceSlice = createSlice({
  name: "deleteStaff",
  initialState: {
   deleteServiceData: null,
   deleteServiceLoading: false,
   deleteServiceError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(deleteService.pending, (state) => {
        state.deleteServiceLoading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.deleteServiceLoading = false;
        state.deleteServiceData = action.payload;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.deleteServiceLoading = false;
        state.deleteServiceError = action.error.message;
      });
  },
});

const updateSettingsSlice = createSlice({
  name: "updateSettings",
  initialState: {
   updateSettingsData: null,
  updateSettingsLoading: false,
    updateSettingsError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( updateSettings.pending, (state) => {
        state.updateSettingsLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.updateSettingsLoading = false;
        state.updateSettingsData = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.updateSettingsLoading = false;
        state.updateSettingsError = action.error.message;
      });
  },
});
const getSettingsSlice = createSlice({
  name: "getSettings",
  initialState: {
   getSettingsData: null,
  getSettingsLoading: false,
   getSettingsError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( getSettings.pending, (state) => {
        state.getSettingsLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.getSettingsLoading = false;
        state.getSettingsData = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.getSettingsLoading = false;
        state.getSettingsError = action.error.message;
      });
  },
});

const listSectionByGenderSlice = createSlice({
  name: "listSectionByGender",
  initialState: {
   listSectionByGenderData: null,
  listSectionByGenderLoading: false,
   listSectionByGenderError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( listSectionByGender.pending, (state) => {
        state.listSectionByGenderLoading = true;
      })
      .addCase(listSectionByGender.fulfilled, (state, action) => {
        state.listSectionByGenderLoading = false;
        state.listSectionByGenderData = action.payload;
      })
      .addCase(listSectionByGender.rejected, (state, action) => {
        state.listSectionByGenderLoading = false;
        state.listSectionByGenderError = action.error.message;
      });
  },
});

const getDashboardStatsSlice = createSlice({
  name: "getDashboardStats",
  initialState: {
  getDashboardStatsData: null,
 getDashboardStatsLoading: false,
   getDashboardStatsError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( getDashboardStats.pending, (state) => {
        state.getDashboardStatsLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.getDashboardStatsLoading = false;
        state.getDashboardStatsData = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.getDashboardStatsLoading = false;
        state.getDashboardStatsError = action.error.message;
      });
  },
});
const getNotificationForAdminSlice = createSlice({
  name: "getNotificationForAdmin",
  initialState: {
  getNotificationForAdminData: null,
 getNotificationForAdminLoading: false,
   getNotificationForAdminError: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase( getNotificationForAdmin.pending, (state) => {
        state.getNotificationForAdminLoading = true;
      })
      .addCase(getNotificationForAdmin.fulfilled, (state, action) => {
        state.getNotificationForAdminLoading = false;
        state.getNotificationForAdminData = action.payload;
      })
      .addCase(getNotificationForAdmin.rejected, (state, action) => {
        state.getNotificationForAdminLoading = false;
        state.getNotificationForAdminError = action.error.message;
      });
  },
});
export const authReducer = authSlice.reducer;
export const listUserReducer = listUserSlice.reducer;
export const listStaffsReducer = listStaffsSlice.reducer;
export const listServiceReducer = listServiceSlice.reducer;
export const addServiceReducer = addServiceSlice.reducer;
export const updateServiceReducer = updateServiceSlice.reducer;
export const registerStaffReducer = registerStaffSlice.reducer;
export const deleteStaffReducer = deleteStaffSlice.reducer;
export const updateStaffReduer = updateStaffSlice.reducer;
export const deleteServiceReducer = deleteServiceSlice.reducer;
export const updateSettingsReducer = updateSettingsSlice.reducer;
export const getSettingsReducer = getSettingsSlice.reducer;
export const listSectionByGenderReducer = listSectionByGenderSlice.reducer;
export const getDashboardStatsReducer = getDashboardStatsSlice.reducer;
export const getNotificationForAdminReducer = getNotificationForAdminSlice.reducer
export const { logout } = authSlice.actions;