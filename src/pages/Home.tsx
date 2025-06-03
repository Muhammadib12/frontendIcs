import styles from "./../styles/Home.module.css";
import { Link } from "react-router-dom";
import Card from "../componenet/Card";
import { ArrowLeft, Calculator, House, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../redux/store";
import stylesCard from "./../styles/ServiceCard.module.css";
import { useEffect } from "react";
import { fetchCards } from "./../redux/slices/cardReducer";
import CardShimmer from "../componenet/CardShimmer";
import WakeUpServer from "../componenet/WakeUpServer";

function Home() {
  const cards = useSelector((state: RootState) => state.cards.items);
  const loading = useSelector((state: RootState) => state.cards.loadingCard);

  const top3Cards = [...cards]
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
      return priceB - priceA;
    })
    .slice(0, 3);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // جلب الكروت عند تحميل الصفحة
    dispatch(fetchCards());

    // كل 10 دقائق (600,000ms) يعيد الجلب تلقائيًا
    const intervalId = setInterval(() => {
      dispatch(fetchCards());
    }, 600000); // 10 دقائق

    // تنظيف المؤقت عند إغلاق الصفحة أو إعادة التكوين
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <WakeUpServer />
      <div className={styles.headerTitle}>
        <h1>
          מצא את הנכס <span className={styles.titleText}>המושלם</span> עבורך
        </h1>
        <p>
          הפלטפורמה המובילה בישראל למציאת, קנייה ומכירה של נדל"ן עם אלפי נכסים
          למכירה ולהשכרה ברחבי הארץ
        </p>
        <div className={styles.headerButtons}>
          <Link to={"/search"}>
            <button>
              <Search size={16} />
              חיפוש נכסים
            </button>
          </Link>

          <Link to={"/addCard"}>
            <button>
              <House size={16} />
              פרסם נכס
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.headerHomeContent}>
        <div className={styles.headerHomeContentText}>
          <h2>נכסים מומלצים</h2>
          <div className={styles.linkLeft}>
            <Link to={"/search"}>צפה בכל הנכסים</Link>
            <ArrowLeft size={14} className={styles.arrowLeft} />
          </div>
        </div>

        <div className={styles.headerHomeContentCards}>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CardShimmer key={index} />
              ))
            : top3Cards.map((card) => (
                <Card key={card.id + "-" + card.price} {...card} />
              ))}
        </div>

        <div className={styles.contentCardServices}>
          <h1 className={styles.ServiceTitle}>השירותים שלנו</h1>
          <div className={styles.ServiceCardContainer}>
            <div className={stylesCard.ServiceCardHeader}>
              <span>
                <Search />
              </span>
              <h2>חיפוש נכסים</h2>
              <p>
                חפש בין אלפי נכסים למכירה ולהשכרה ברחבי ישראל באמצעות מערכת
                החיפוש המתקדמת שלנו.
              </p>
            </div>
            <div className={stylesCard.ServiceCardHeader}>
              <span>
                <House />
              </span>
              <h2>פרסום נכסים</h2>
              <p>
                פרסם את הנכס שלך באתר שלנו וחשוף אותו לאלפי לקוחות פוטנציאליים
                בכל רחבי הארץ.
              </p>
            </div>
            <div className={stylesCard.ServiceCardHeader}>
              <span>
                <Calculator />
              </span>
              <h2>מחשבון משכנתא</h2>
              <p>
                חשב את תשלומי המשכנתא החודשיים שלך וקבל מידע על מסלולי משכנתא
                שונים באמצעות המחשבון המתקדם שלנו.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomHomeContent}>
          <h1>מחפש לקנות או למכור נכס?</h1>
          <p>
            הצטרף למאות המשתמשים שמצאו את הנכס המושלם או את הקונה האידיאלי
            באמצעות הפלטפורמה שלנו
          </p>
          <div className={styles.links}>
            <Link to={"/signup"}>הרשם עכשיו</Link>
            <Link to={"/search"}>חפש נכסים</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
