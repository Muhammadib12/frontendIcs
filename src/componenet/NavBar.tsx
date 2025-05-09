import React from "react";
import styles from "./../styles/NavBar.module.css";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
function NavBar() {
  const dispatch = useDispatch();
  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to={"/"} className={styles.navbar__logo}>
          נדל"ן ישראלי
        </Link>
      </h1>
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

      <Menu className={styles.menu} onClick={() => dispatch(toggleSidebar())} />
    </nav>
  );
}

export default NavBar;
