import React, { useEffect, useState } from "react";
import styles from "./../styles/SignUp.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { toast } from "react-toastify";

interface SignupForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  password2: string;
  agree: boolean;
}

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [signUpform, setSignUpForm] = useState<SignupForm>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password2: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Partial<SignupForm>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<SignupForm> = {};

    // التحقق من الحروف الإنجليزية فقط للاسم
    const englishNameRegex = /^[A-Za-z\s]+$/;
    if (!englishNameRegex.test(signUpform.fullName)) {
      newErrors.fullName = "השם חייב להיות באותיות באנגלית בלבד";
    }

    // التحقق من الحروف الإنجليزية فقط لليوزرنيم
    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!usernameRegex.test(signUpform.username)) {
      newErrors.username = "שם המשתמש חייב להכיל רק אותיות באנגלית ומספרים";
    }

    // عدم قبول اسم مستخدم admin (بكل الأحرف)
    if (signUpform.username.toLowerCase() === "admin") {
      newErrors.username = "שם המשתמש הזה אינו זמין";
    }

    // التحقق من البريد
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpform.email)) {
      newErrors.email = "האימייל לא תקין";
    }

    // رفض أي اسم يحتوي على "admin"
    if (
      signUpform.username.toLowerCase().includes("admin") ||
      signUpform.fullName.toLowerCase().includes("admin")
    ) {
      newErrors.username = "מהשהוא לא חוקי";
    }

    // التحقق من قوة كلمة المرور
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(signUpform.password)) {
      newErrors.password =
        "הסיסמה חייבת להכיל לפחות 6 תווים, כולל אותיות ומספרים";
    }

    // التحقق من تطابق كلمتي المرور
    if (signUpform.password !== signUpform.password2) {
      newErrors.password2 = "הסיסמאות אינן תואמות";
    }

    // عرض كل التوستات في حال وجود أخطاء
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => {
        if (msg) toast.error(msg);
      });
      return;
    }

    // إذا لا يوجد أخطاء
    setErrors({});

    dispatch(
      signupUser({
        username: signUpform.username,
        email: signUpform.email,
        password: signUpform.password,
        tel: signUpform.phone,
        name: signUpform.fullName,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={styles.signup}>
      <h1>הרשמה</h1>
      <p>הצטרף למערכת הנדל"ן המובילה בישראל</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.name}>
          <label htmlFor="name">שם מלא</label>
          <input
            type="text"
            placeholder="הזן שם מלא"
            value={signUpform.fullName}
            className={errors.fullName ? styles.invalid : ""}
            onChange={(e) =>
              setSignUpForm({ ...signUpform, fullName: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.crad}>
          <div className={styles.name}>
            <label htmlFor="user">שם משתמש</label>
            <input
              type="text"
              placeholder="הזן שם משתמש"
              value={signUpform.username}
              className={errors.username ? styles.invalid : ""}
              onChange={(e) =>
                setSignUpForm({ ...signUpform, username: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.name}>
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={signUpform.email}
              onChange={(e) =>
                setSignUpForm({ ...signUpform, email: e.target.value })
              }
              className={errors.email ? styles.invalid : ""}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.name}>
          <label htmlFor="number">מספר טלפון</label>
          <input
            type="text"
            placeholder="050-1234567"
            value={signUpform.phone}
            onChange={(e) =>
              setSignUpForm({ ...signUpform, phone: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.name}>
          <label htmlFor="address">כתובת</label>
          <input
            type="text"
            placeholder="עיר, רחוב ומספר"
            value={signUpform.address}
            onChange={(e) =>
              setSignUpForm({ ...signUpform, address: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.crad}>
          <div className={styles.name}>
            <label htmlFor="pass1">סיסמה</label>
            <input
              type="password"
              placeholder="הזן סיסמה"
              value={signUpform.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpform, password: e.target.value })
              }
              className={errors.password ? styles.invalid : ""}
              required
            />
            {/* {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )} */}
          </div>
          <div className={styles.name}>
            <label htmlFor="pass2">אימות סיסמה</label>
            <input
              type="password"
              placeholder="הזן סיסמה שוב"
              value={signUpform.password2}
              onChange={(e) =>
                setSignUpForm({ ...signUpform, password2: e.target.value })
              }
              className={errors.password2 ? styles.invalid : ""}
              required
            />
            {/* {errors.password2 && (
              <p className={styles.error}>{errors.password2}</p>
            )} */}
          </div>
        </div>

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={signUpform.agree}
            onChange={(e) =>
              setSignUpForm({ ...signUpform, agree: e.target.checked })
            }
          />
          <label htmlFor="checkbox">אני מאשר את תנאי השימוש</label>
        </div>

        {/* {error && <p className={styles.error}>{error}</p>} */}

        <button
          className={styles.submit}
          type="submit"
          disabled={!signUpform.agree || loading}
        >
          {!signUpform.agree ? "🚫 הירשם" : loading ? "נרשם..." : "הרשמה"}
        </button>

        <p className={styles.login}>
          כבר יש לך חשבון? <Link to={"/login"}>התחבר</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
