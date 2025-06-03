import {
  Calculator,
  ChartColumn,
  CloudAlert,
  Home,
  HomeIcon,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import  { useState } from "react";
import styles from "./../styles/Profile.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import ProfileContent from "../componenet/ProfileContent";
import MyCards from "../componenet/MyCards";
import Alerts from "../componenet/Alerts";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
function Profile() {
  const [activeTab, setActiveTab] = useState<"profile" | "assets" | "alerts">(
    "profile"
  );

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("התנתקת בהצלחה");
  };

  return (
    <div className={styles.proCon}>
      <aside className={`${styles.asside} ${menuOpen ? styles.active : ""}`}>
        <div className={styles.asideHead}>
          <span>{!menuOpen ? "אזור אישי" : ""}</span>
          <Menu
            onClick={() => setMenuOpen((prev) => !prev)}
            size={20}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className={styles.asideRoutes}>
          <Link to={"/search"} className={styles.asideRoute}>
            {!menuOpen ? "נכסים" : ""}
            <Home size={19} />
          </Link>

          <Link to={"/profile"} className={styles.asideRoute}>
            {!menuOpen ? "הגדרות פרופיל" : ""}
            <Settings size={19} />
          </Link>

          <Link to={"/calculator"} className={styles.asideRoute}>
            {!menuOpen ? "מחשבון משכנתא" : ""}
            <Calculator size={19} />
          </Link>

          {user?.username.toLowerCase() === "admin1" && (
            <>
              <Link to={"/charst"} className={styles.asideRoute}>
                {!menuOpen ? "לוח בקרה" : ""}
                <ChartColumn size={19} />
              </Link>
              <Link to={"/users-management"} className={styles.asideRoute}>
                {!menuOpen ? "ניהול משתמשים" : ""}
                <User size={19} />
              </Link>
            </>
          )}
          <Link to={"/"} className={styles.asideRoute} onClick={handleLogout}>
            {!menuOpen ? <span>התנתק</span> : ""}
            <LogOut
              size={20}
              style={{
                color: "red !important",
                background: "#000 !important",
              }}
            />
          </Link>
        </div>
      </aside>

      <main className={styles.mainCon}>
        <h1>הפרופיל שלי</h1>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "profile" ? styles.active1 : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <span>פרופיל</span>
            <User size={18} className={styles.isHide} />
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "assets" ? styles.active1 : ""
            }`}
            onClick={() => setActiveTab("assets")}
          >
            <span>הנכסים שלי</span>
            <HomeIcon size={18} className={styles.isHide} />
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "alerts" ? styles.active1 : ""
            }`}
            onClick={() => setActiveTab("alerts")}
          >
            <span>התראות</span>
            <CloudAlert size={18} className={styles.isHide} />
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "profile" && <ProfileContent />}

          {activeTab === "assets" && <MyCards />}

          {activeTab === "alerts" && <Alerts />}
        </div>
      </main>
    </div>
  );
}
export default Profile;
