import React from "react";

import styles from "./../styles/Signup.module.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className={styles.signup}>
        <h1>הרשמה</h1>
        <p>הצטרף למערכת הנדל"ן המובילה בישראל</p>

        <form>
          <div className={styles.name}>
            <label htmlFor="name">שם מלא</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="הזן שם מלא"
              required
            />
          </div>

          <div className={styles.crad}>
            <div className={styles.name}>
              <label htmlFor="user">שם משתמש</label>
              <input
                type="text"
                id="user"
                name="text"
                placeholder="הזן שם משתמש"
                required
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="email">אימייל</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@gmail.com"
                required
              />
            </div>
          </div>

          <div className={styles.name}>
            <label htmlFor="number">מספר טלפון</label>
            <input type="text" placeholder="050-1234567" id="number" required />
          </div>

          <div className={styles.name}>
            <label htmlFor="text">כתובת</label>
            <input
              type="text"
              id="text"
              name="loca"
              placeholder="עיר,רחוב ומספר"
              required
            />
          </div>

          <div className={styles.crad}>
            <div className={styles.name}>
              <label htmlFor="pass1">סיסמה</label>
              <input
                type="password"
                id="pass1"
                name="text"
                placeholder="הזן סיסמה"
                required
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="pass2">אימות סיסמה</label>
              <input
                type="password"
                id="pass2"
                name="email"
                placeholder="הזן סיסמה שוב"
                required
              />
            </div>
          </div>
          <button className={styles.show}>הצג סיסמאות</button>

          <div className={styles.checkbox}>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">אני מאשר את תנאי השימוש</label>
          </div>

          <button className={styles.submit} type="submit">
            הירשם
          </button>
          <p className={styles.login}>
            כבר יש לך חשבון? <Link to={"/login"}>התחבר</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
