import React, { useEffect, useRef, useState } from "react";
import styles from "./../styles/NavBar.module.css";
import { Link } from "react-router-dom";
import {
  AlertTriangleIcon,
  ChartColumn,
  House,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "./../redux/slices/authSlice";
import { toast } from "react-toastify";
function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const [openUserMe, setOpenUserMe] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("התנתקת בהצלחה");
  };

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleInteraction = (event: Event) => {
      if (
        openUserMe &&
        userMenuRef.current &&
        event.target instanceof Node &&
        !userMenuRef.current.contains(event.target)
      ) {
        setOpenUserMe(false);
      }
    };

    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("scroll", handleInteraction);

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, [openUserMe]);
  // ← أضفها كـ dependency

  return (
    <nav className={styles.navbar}>
      <h1>
        {isLoggedIn ? (
          <Link to={"/"} className={styles.navbar__logo}>
            נדל"ן ישראלי
          </Link>
        ) : (
          <span className={styles.navbar__logo}> נדל"ן ישראלי</span>
        )}
      </h1>
      {isLoggedIn && (
        <ul className={styles.navbar__links}>
          <li>
            <Link to={"/"}>דף הבית</Link>
          </li>
          <li>
            <Link to={"/search"}>חיפוש נכסים</Link>
          </li>
          <li>
            <Link to={"/addcard"}>פרסם נכס</Link>
          </li>
          <li>
            <Link to={"/calculator"}>מחשבון משכנתא</Link>
          </li>
        </ul>
      )}

      {isLoggedIn == false ? (
        <>
          <ul className={styles.navbar__links}>
            <li>
              <Link to={"/"}>דף הבית</Link>
            </li>
            <li>
              <Link to={"/search"}>חיפוש נכסים</Link>
            </li>

            <li>
              <Link to={"/calculator"}>מחשבון משכנתא</Link>
            </li>
          </ul>
          <div className={styles.navbar__links__btn}>
            <Link to={"/login"}>התחברות</Link>
            <Link to={"/signup"}>הרשמה</Link>
          </div>
        </>
      ) : (
        <div className={styles.navbar__links__btn1}>
          {/* <LogOut
            onClick={handleLogout}
            size={20}
            style={{ color: "red !important", background: "#000 !important" }}
          /> */}
          {/* <span onClick={handleLogout}>Logout</span> */}

          <div
            className={styles.usernameCon}
            onClick={() => setOpenUserMe((prev) => !prev)}
            ref={userMenuRef}
          >
            {user?.username.toLowerCase() === "admin1" ? (
              <>
                <span className={styles.adminTag}>
                  מנהל מערכת <Settings size={18} />
                </span>
              </>
            ) : (
              <span
                className={`${styles.username} ${
                  user?.status === "blocked" ? styles.blocked : ""
                }`}
              >
                <span className={styles.circle}>{user?.username[0]}</span>
                {user?.username.toLocaleLowerCase()}
              </span>
            )}

            {openUserMe && (
              <div className={styles.userRole}>
                <Link to={"/profile"} className={styles.asideRoute}>
                  הפרופיל שלי
                  <User size={18} />
                </Link>
                <Link to={"/profile"} className={styles.asideRoute}>
                  הגדרות
                  <Settings size={18} />
                </Link>
                <Link to={"/addCard"} className={styles.asideRoute}>
                  פרסם נכס
                  <House size={18} />
                </Link>
                {user?.username.toLowerCase() === "admin1" ? (
                  <>
                    {" "}
                    <Link to={"/charst"} className={styles.asideRoute}>
                      לוח בקרה
                      <ChartColumn size={19} />
                    </Link>
                    <Link
                      to={"/users-management"}
                      className={styles.asideRoute}
                    >
                      ניהול משתמשים
                      <User size={19} />
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <div className={styles.line} />

                <Link
                  to={"/"}
                  className={styles.asideRoute}
                  onClick={handleLogout}
                >
                  <span>התנתק</span>
                  <LogOut
                    size={20}
                    style={{
                      color: "red !important",
                      background: "#000 !important",
                    }}
                  />
                </Link>
              </div>
            )}
          </div>
          <Menu
            className={styles.menu}
            onClick={() => dispatch(toggleSidebar())}
          />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
