import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./../styles/LogIn.module.css";
function LogIn() {
  const Btnref = useRef<HTMLButtonElement>(null);
  const [showPass, setShowPass] = useState<boolean>(true);
  const text = showPass ? "הסתר" : "הצג";
  const handleClick = (e: any) => {
    e.preventDefault();
    if (Btnref.current) {
      Btnref.current.innerText = "התחברות...";
      Btnref.current.disabled = true;
    }
  };

  const handelShowPass = (e: any) => {
    e.preventDefault();
    setShowPass((prev) => !prev);
  };

  return (
    <>
      <div className={styles.login}>
        <h1>התחברות</h1>
        <p>ברוכים הבאים חזרה לנדל"ן ישראלי</p>

        <form>
          <div className={styles.input}>
            <label htmlFor="Name">שם משתמש</label>
            <input type="text" placeholder="הזן שם משתמש" required />
          </div>

          <div className={styles.passwords}>
            <label htmlFor="password">סיסמה</label>
            <div className={styles.password}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="הזן סיסמה"
                required
              />
              <button onClick={handelShowPass}>{text}</button>
            </div>
          </div>

          <div className={styles.rememberFath}>
            <div className={styles.rememberChild}>
              <input type="checkbox" />
              <label htmlFor="remember">זכור אותי</label>
            </div>
            <div>
              <a href="#">שכחת סיסמה?</a>
            </div>
          </div>

          <div className={styles.submit}>
            <button onClick={handleClick} type="submit" ref={Btnref}>
              התחבר
            </button>
            <p>
              אין לך חשבון עדיין? <Link to={"/signup"}>הירשם כעת</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;
