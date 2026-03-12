// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { addServiceReducer, authReducer, deleteServiceReducer, deleteStaffReducer, getDashboardStatsReducer, getNotificationForAdminReducer, getSettingsReducer, listSectionByGenderReducer, listServiceReducer, listStaffsReducer, listUserReducer, registerStaffReducer, updateServiceReducer, updateSettingsReducer, updateStaffReduer } from "./adminSlice";
// import { updateService } from "./adminThunk";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    listUser:listUserReducer,
    listStaffs:listStaffsReducer,
    listService:listServiceReducer,
    addService:addServiceReducer,
    updateService:updateServiceReducer,
    registerStaff:registerStaffReducer,
    deleteStaff:deleteStaffReducer,
    updateStaff:updateStaffReduer,
    deleteService:deleteServiceReducer,
    updateSettings:updateSettingsReducer,
    getSettings:getSettingsReducer,
    listSectionByGender:listSectionByGenderReducer,
    getDashboardStats:getDashboardStatsReducer,
    getNotificationForAdmin:getNotificationForAdminReducer
  },
});
