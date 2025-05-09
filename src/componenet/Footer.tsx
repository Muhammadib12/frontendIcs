import React from "react";
import styles from "./../styles/Footer.module.css";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={styles.footer__container}>
      <div className={styles.footer__content}>
        <div className={styles.footer__title}>
          <h2>נדל"ן ישראלי</h2>
          <p>הפלטפורמה המובילה בישראל למציאת נכסי נדל"ן לרכישה והשכרה.</p>
          <div className={styles.footer__title__icons}>
            <a href="#">
              <Facebook size={20} />
            </a>
            <a href="#">
              <Instagram size={20} />
            </a>
            <a href="#">
              <Twitter size={20} />
            </a>
            <a href="#">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className={styles.footer__links}>
          <h2>קישורים מהירים</h2>
          <ul>
            <li>
              <Link to={"/"}>דף הבית</Link>
            </li>
            <li>
              <Link to={"/search"}>חיפוש נכסים</Link>
            </li>
            <li>
              <Link to={"/calculator"}>מחשבון משכנתא</Link>
            </li>
            <li>
              <Link to={"/signup"}>הרשמה </Link>
            </li>
            <li>
              <Link to={"/login"}>התחברות </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer__social}>
          <h2>צור קשר</h2>
          <div className={styles.footrer__concat__division}>
            <MapPin size={16} className={styles.concat__icons} />
            <h4>רחוב אלנבי 58, תל אביב</h4>
          </div>
          <div className={styles.footrer__concat__division}>
            <Phone size={16} className={styles.concat__icons} />
            <h4>03-1234567</h4>
          </div>
          <div className={styles.footrer__concat__division}>
            <Mail size={16} className={styles.concat__icons} />
            <h4>info@realestate-il.com</h4>
          </div>
          <div className={styles.footrer__concat__division}>
            <Clock size={16} className={styles.concat__icons} />
            <h4>ימים א'-ה': 09:00-18:00</h4>
          </div>
        </div>

        <div className={styles.footer__register}>
          <h2>הרשמה לעדכונים</h2>
          <p>הישארו מעודכנים בנכסים חדשים ומבצעים מיוחדים</p>
          <div className={styles.footer__register__inputs}>
            <input type="email" placeholder="כתוב אימייל" />
            <button>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer__line} />
      
      <div className={styles.footer__bottom}>
        <p>© 2023 נדל"ן ישראלי. כל הזכויות שמורות.</p>
        <div className={styles.footer__bottom__links}>
          <p>תנאי שימוש</p>
          <p>מדיניות פרטיות</p>
          <p>מפת האתר</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
