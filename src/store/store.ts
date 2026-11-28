import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/bannerSlice";
import authReducer from "./slices/authSlice";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";
import requestReducer from "./slices/requestSlice";
import loanReducer from "./slices/loanSlice";
import staffReducer from "./slices/staffSlice";
import adminReducer from "./slices/adminSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    request: requestReducer,
    loan: loanReducer,
    staff: staffReducer,
    admin: adminReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

