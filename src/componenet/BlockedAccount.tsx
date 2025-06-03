
import styles from "./../styles/BlockedAccount.module.css";
import {
  Shield,
  AlertTriangle,
  Mail,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";

const BlockedAccount = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <div className={styles.headerText}>
              <h1 className={styles.title}>החשבון שלך הושעה זמנית</h1>
              <div className={styles.statusBadge}>
                <Clock size={16} />
                <span>השעיה זמנית</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Alert Message */}
          <div className={styles.alertBox}>
            <div className={styles.alertContent}>
              <AlertTriangle size={20} />
              <div className={styles.alertText}>
                <h3 className={styles.alertTitle}>
                  גישה מוגבלת לתכנים מסוימים
                </h3>
                <p className={styles.alertDescription}>
                  כרגע אינך יכול לגשת לחלק מהתכנים והשירותים באתר שלנו
                </p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FileText size={20} />
              מדיניות השעיית חשבונות
            </h2>

            <div className={styles.explanationText}>
              <p>
                החשבון שלך הושעה זמנית על ידי צוות הניהול שלנו. במהלך תקופת
                ההשעיה:
              </p>

              <ul className={styles.restrictionsList}>
                <li className={styles.restrictionItem}>
                  <ArrowRight size={16} />
                  <span>לא תוכל לפרסם מודעות חדשות או לערוך קיימות</span>
                </li>
                <li className={styles.restrictionItem}>
                  <ArrowRight size={16} />
                  <span>הגישה לחלק מהשירותים תהיה מוגבלת</span>
                </li>
                <li className={styles.restrictionItem}>
                  <ArrowRight size={16} />
                  <span>תוכל עדיין לצפות בתכנים ולקרוא מידע</span>
                </li>
                <li className={styles.restrictionItem}>
                  <ArrowRight size={16} />
                  <span>יכולת התקשרות עם תמיכת לקוחות נותרת פעילה</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Policy Info */}
          <div className={styles.policyBox}>
            <h3 className={styles.policyTitle}>מדוע הושעה החשבון?</h3>
            <p className={styles.policyDescription}>
              השעיית חשבונות מתבצעת כאשר זוהתה פעילות החורגת מתנאי השימוש שלנו.
              המטרה היא לשמור על סביבה בטוחה ואמינה לכל המשתמשים.
            </p>
            <p className={styles.policyNote}>
              <strong>שימו לב:</strong> זוהי מדיניות סטנדרטית החלה על כל
              המשתמשים באופן שווה.
            </p>
          </div>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>יש לך שאלות או השגות?</h3>

            <div className={styles.contactBox}>
              <div className={styles.contactHeader}>
                <Mail size={20} />
                <span>צור קשר עם הניהול</span>
              </div>

              <p className={styles.contactDescription}>
                אם אתה סבור שההשעיה בוצעה בטעות או שיש לך שאלות נוספות:
              </p>

              <div className={styles.emailBox}>
                <p className={styles.emailLabel}>
                  <strong>דוא״ל:</strong>
                </p>
                <a
                  href="mailto:support@example.com"
                  className={styles.emailLink}
                >
                  support@example.com
                </a>
              </div>

              <p className={styles.responseTime}>
                זמן תגובה ממוצע: 24-48 שעות בימי עסקים
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className={styles.footer}>
            תודה על הבנתך ושיתוף הפעולה. אנו פועלים כדי לשמור על קהילה בטוחה
            ואיכותית.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedAccount;
