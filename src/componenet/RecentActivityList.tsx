// components/RecentActivityList.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import styles from "./../styles/RecentActivityList.module.css"; // صممه أنت لاحقًا
import ShimmerLoading from "./ShimmerLoading";

interface Activity {
  user: string;
  action: string;
  details: string;
  createdAt: string;
}

const RecentActivityList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/admin/activities");
        setActivities(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    <ShimmerLoading type="list" count={5} variant="compact" />;
  }

  if (activities.length === 0) {
    return <div className={styles.noActivities}>אין פעילות אחרונה</div>;
  }

  return (
    <div className={styles.activityList}>
      <h3>פעילות אחרונה</h3>
      {activities.map((a, i) => (
        <div key={i} className={styles.activityItem}>
          <div className={styles.avatar}>{a.user.charAt(0).toUpperCase()}</div>
          <div>
            <div className={styles.action}>
              <strong>{a.user}</strong>
              <span>{a.details}</span>
            </div>

            <div className={styles.date}>
              {new Date(a.createdAt).toLocaleDateString("he-IL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;
