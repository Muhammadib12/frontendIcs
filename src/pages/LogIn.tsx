import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import styles from "./../styles/LogIn.module.css";

import axios from "./../utils/axios";
import { toast } from "react-toastify";

function LogIn() {
  const Btnref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const text = showPass ? "הסתר" : "הצג";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      if (Btnref.current) {
        Btnref.current.innerText = "התחברות...";
        Btnref.current.disabled = true;
      }

      const res = await axios.post(
        "/api/auth/signin",
        { username, password, rememberme: rememberme },
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data.user));

      navigate("/home");
      toast.success(" התחברות בוצעה בהצלחה");
    } catch (err: any) {
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
      if (Btnref.current) {
        Btnref.current.innerText = "התחבר";
        Btnref.current.disabled = false;
      }
      toast.error(err.response?.data?.message || "שגיאה בהתחברות");
    }
  };
  return (
    <div className={styles.login}>
      <h1>התחברות</h1>
      <p>ברוכים הבאים חזרה לנדל"ן ישראלי</p>

      <form onSubmit={handleLogin}>
        <div className={styles.input}>
          <label htmlFor="Name">שם משתמש</label>
          <input
            type="text"
            placeholder="הזן שם משתמש"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.passwords}>
          <label htmlFor="password">סיסמה</label>
          <div className={styles.password}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="הזן סיסמה"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}
            >
              {text}
            </button>
          </div>
        </div>

        <div className={styles.rememberFath}>
          <div className={styles.rememberChild}>
            <input
              type="checkbox"
              checked={rememberme}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">זכור אותי</label>
          </div>
          <div>
            <a href="#">שכחת סיסמה?</a>
          </div>
        </div>

        <div className={styles.submit}>
          <button type="submit" ref={Btnref}>
            התחבר
          </button>
          <p>
            אין לך חשבון עדיין? <Link to={"/signup"}>הירשם כעת</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
