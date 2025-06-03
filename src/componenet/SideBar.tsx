
import styles from "./../styles/SideBar.module.css";
import { Calculator, Home, LogOut, Search, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  toggleSidebar } from "../redux/slices/sidebarSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "./../redux/slices/authSlice";
function SideBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(toggleSidebar());
  };
  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     dispatch(closeSidebar());
  //   }
  // };
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>נדל"ן ישראלי</h2>
        <X
          size={24}
          className={styles.closeIcon}
          onClick={() => dispatch(toggleSidebar())}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarContentText}>
          <Home size={24} />
          <Link to={"/"} onClick={() => dispatch(toggleSidebar())}>
            דף הבית
          </Link>
        </div>
        <div className={styles.sidebarContentText}>
          <Search size={24} />
          <Link to={"/search"} onClick={() => dispatch(toggleSidebar())}>
            חיפוש נכסים
          </Link>
        </div>
        <div className={styles.sidebarContentText}>
          <Calculator size={24} />
          <Link to={"/calculator"} onClick={() => dispatch(toggleSidebar())}>
            מחשבון משכנתא
          </Link>
        </div>
        {!isLoggedIn && (
          <>
            {" "}
            <div className={styles.sidebarContentText}>
              <User size={24} />
              <Link to={"/login"} onClick={() => dispatch(toggleSidebar())}>
                התחברות
              </Link>
            </div>
            <div className={styles.sidebarContentText}>
              <User size={24} />
              <Link to={"/signup"} onClick={() => dispatch(toggleSidebar())}>
                הרשמה
              </Link>
            </div>
          </>
        )}

        {isLoggedIn && (
          <div className={styles.sidebarContentText}>
            <LogOut
              onClick={handleLogout}
              size={20}
              style={{ color: "red !important", background: "#000 !important" }}
            />
            <span style={{ color: "#20325a" }}>התנתק</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
