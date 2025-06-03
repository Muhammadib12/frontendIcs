import React from "react";
import styles from "./../styles/ProfileContent.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateProfile } from "./../redux/slices/authSlice";
import { toast } from "react-toastify";
import BlockedAccount from "./BlockedAccount";

function ProfileContent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  if (!user) {
    return <div className={styles.profileContent}>Loading...</div>;
  }

  const [userForm, setUserForm] = React.useState({
    name: user.name,
    tel: user.tel || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const loading = useSelector((state: RootState) => state.auth.loadingUpdate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    // تحقق من مطابقة كلمتي المرور
    if (
      (userForm.newPassword || userForm.confirmPassword) &&
      userForm.newPassword !== userForm.confirmPassword
    ) {
      toast.error("הסיסמאות אינן תואמות");
      return;
    }

    // إذا تم إدخال كلمة مرور جديدة، يجب إدخال كلمة المرور الحالية
    if (userForm.newPassword && !userForm.currentPassword) {
      toast.error("יש להזין את הסיסמה הנוכחית לשם שינוי סיסמה");
      return;
    }

    // تحقق من صحة كلمة المرور الجديدة إذا كانت موجودة
    if (userForm.newPassword) {
      const password = userForm.newPassword.trim();

      if (password.length < 6) {
        toast.error("הסיסמה חייבת להכיל לפחות 6 תווים");
        return;
      }

      if (!/[a-zA-Z]/.test(password)) {
        toast.error("הסיסמה חייבת להכיל לפחות אות אחת");
        return;
      }
    }

    try {
      await dispatch(
        updateProfile({
          name: userForm.name,
          tel: userForm.tel,
          password: userForm.currentPassword,
          newPassword: userForm.newPassword,
        })
      );

      toast.success("הפרופיל עודכן בהצלחה");
      setUserForm({
        ...userForm,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error.message || "שגיאה בעדכון הפרופיל");
    }
  };

  if (user.status === "blocked") {
    return <BlockedAccount />;
  }

  return (
    <div className={styles.profileContent}>
      <h2>פרטי הפרופיל</h2>
      <div className={styles.profileDetails}>
        <div className={styles.profileHeadInputs}>
          <div className={styles.profileInputs}>
            <label htmlFor="username">שם משתמש</label>
            <input type="text" value={user.username} readOnly />
          </div>
          <div className={styles.profileInputs}>
            <label htmlFor="email">אימייל</label>
            <input type="email" value={user.email} readOnly />
          </div>
        </div>
        <div className={styles.profileHeadInputs}>
          <div className={styles.profileInputs}>
            <label htmlFor="name">שם מלא*</label>
            <input
              type="text"
              id="name"
              value={userForm.name}
              onChange={handleChange}
              style={{ cursor: "default" }}
            />
          </div>
          <div className={styles.profileInputs}>
            <label htmlFor="tel">טלפון</label>
            <input
              type="text"
              id="tel"
              value={userForm.tel}
              onChange={handleChange}
              style={{ cursor: "default" }}
            />
          </div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.changePasswordCon}>
        <h2>שינוי סיסמה</h2>
        <div className={styles.changPasswordNew}>
          <label htmlFor="currentPassword">סיסמה נוכחית</label>
          <input
            type="password"
            id="currentPassword"
            placeholder="הזן את הסיסמה הנוכחית"
            value={userForm.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className={styles.changPasswordNewConf}>
          <div className={styles.changPasswordNew1}>
            <label htmlFor="newPassword">סיסמה חדשה</label>
            <input
              type="password"
              id="newPassword"
              value={userForm.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className={styles.changPasswordNew1}>
            <label htmlFor="confirmPassword">אימות סיסמה</label>
            <input
              type="password"
              id="confirmPassword"
              value={userForm.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button
        className={styles.saveBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "שומר..." : "שמור שינויים"}
      </button>
    </div>
  );
}

export default ProfileContent;
