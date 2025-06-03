import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axiosInstance from "../../utils/axios";

// واجهة المستخدم
interface User {
  id: string;
  username: string;
  email: string;
  tel: string;
  name: string;
  status: string; // يمكن أن يكون "active" أو "blocked" أو "pending"
}

// حالة المصادقة
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  loadingUpdate: boolean;
  loading1: boolean; // حالة التحميل لتحديث البروفايل
}

// الحالة الأولية
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  loadingUpdate: false,
  loading1: false,
};

// فحص تسجيل الدخول بناء على الجلسة (الكوكي)
export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    dispatch(loadingCheckAuth());
    // إرسال الطلب مع إعدادات الكوكيز
    const response = await axiosInstance.get("/api/auth/check-login", {
      withCredentials: true, // مهم جداً لإرسال الكوكيز
    });

    dispatch(loginSuccess(response.data.user));
  } catch (error: any) {
    dispatch(
      loginFailure(error.response?.data?.message || "Not authenticated")
    );
    dispatch(loadinCheckAuthEnd());
  } finally {
    dispatch(loadinCheckAuthEnd());
  }
};

// تسجيل الدخول
export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());

      const response = await axiosInstance.post(
        "/api/auth/signin",
        credentials,
        {
          withCredentials: true, // لحفظ الكوكي
        }
      );

      dispatch(loginSuccess(response.data.user));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  };

// تسجيل الخروج
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.post(
      "/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(logout());
  } catch (error) {
    // حتى لو فشل طلب logout، قم بتسجيل الخروج محلياً
    dispatch(logout());
  }
};

export const signupUser =
  (data: {
    username: string;
    email: string;
    password: string;
    tel: string;
    name: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());

      const response = await axiosInstance.post("/api/auth/signup", data, {
        withCredentials: true,
      });

      dispatch(loginSuccess(response.data.user)); // نفس معاملة تسجيل دخول تلقائي
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Signup failed"));
    }
  };

export const updateProfile =
  (data: {
    password: string;
    newPassword: string;
    tel: string;
    name: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProfileStart());

      const response = await axiosInstance.put(
        "/api/auth/update-profile",
        data,
        {
          withCredentials: true,
        }
      );

      dispatch(updateProfileSuccess(response.data.user));
      return response.data.user;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      dispatch(updateProfileFailure(message));
      throw new Error(message); // 🔥 مهم جداً حتى يُلتقط في الواجهة
    }
  };

// إنشاء Slice
// إنشاء Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    loadingCheckAuth(state) {
      state.loading1 = true;
      state.error = null;
    },
    loadinCheckAuthEnd(state) {
      state.loading1 = false;
      state.error = null;
    },

    // الحالات الجديدة لتحديث البروفايل
    updateProfileStart(state) {
      state.loadingUpdate = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<User>) {
      state.loadingUpdate = false;
      state.user = action.payload;
      state.error = null;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
  },
});

// تصدير الأكشنات والمخفض
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  loadingCheckAuth,
  loadinCheckAuthEnd,
} = authSlice.actions;
export default authSlice.reducer;
