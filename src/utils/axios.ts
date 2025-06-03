import axios from "axios";

// إنشاء instance من axios مع إعدادات افتراضية
const axiosInstance = axios.create({
  baseURL: "https://backendics.onrender.com",
  withCredentials: true, // مهم جداً لإرسال واستقبال الكوكيز
  timeout: 10000, // مهلة زمنية للطلبات
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة interceptor للاستجابات للتعامل مع انتهاء صلاحية التوكن
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // إذا كانت الاستجابة 401 (غير مصرح) - التوكن منتهي الصلاحية
    if (error.response?.status === 401) {
      // يمكنك إضافة منطق إضافي هنا مثل إعادة التوجيه لصفحة تسجيل الدخول
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
