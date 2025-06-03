import { useEffect, useState } from "react";
// import axios from "axios";
import CardDashBoard from "./../componenet/CardDashBoard";
import { Users, Home, Eye, ArrowRight } from "lucide-react";
import styles from "./../styles/Charts.module.css";
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";
import UserGrowthChart from "../componenet/UserGrowthChart";
import PropertyDistributionChart from "../componenet/PropertyDistributionChart";
import RecentActivityList from "../componenet/RecentActivityList";
// import ShimmerLoading from "../componenet/ShimmerLoading";

function Charts() {
  const [stats, setStats] = useState<{
    users: { count: number; change: number };
    cards: { count: number; change: number };
    visits: { count: number; change: number };
  } | null>(null);

 
  useEffect(() => {
    const fetchStats = async () => {
      try {
       
        const res = await axiosInstance.get("/api/admin/stats");
          setStats(res.data);
      } catch (err) {
      } 
    };

    fetchStats();
  }, []);

  // if (!stats) return <ShimmerLoading type="list" count={5} variant="compact" />;

  return (
    <div className={styles.chartsContainer}>
      <Link to="/profile" className={styles.backLink}>
        <ArrowRight size={18} />
        חזרה לדף ניהול
      </Link>
      <h1>לוח בקרה - מנהל מערכת</h1>
      <div className={styles.cardsGrid}>
        <CardDashBoard
          title="משתמשים רשומים"
          value={stats?.users.count ?? 0}
          change={stats?.users.change ?? 0}
          icon={<Users />}
         
        />
        <CardDashBoard
          title="מודעות פעילות"
          value={stats?.cards.count ?? 0}
          change={stats?.cards.change ?? 0}
          icon={<Home />}
         
        />
        <CardDashBoard
          title="ביקורים חודשיים"
          value={stats?.visits.count ?? 0}
          change={stats?.visits.change ?? 0}
          icon={<Eye />}
         
        />
      </div>
      <div className={styles.chartsSection}>
        <UserGrowthChart />
        <PropertyDistributionChart />
      </div>
      <RecentActivityList />
    </div>
  );
}

export default Charts;
