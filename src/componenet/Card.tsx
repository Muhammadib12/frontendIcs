import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./../styles/Card.module.css";
import { Phone, Ruler, Bed, Bath, Heart } from "lucide-react";

interface CardProps {
  title: string;
  price: string;
  location: string;
  size: string;
  rooms: number;
  baths: number;
  image: string;
  forSale: boolean;
}

function Card({
  title,
  price,
  location,
  size,
  rooms,
  baths,
  image,
  forSale,
}: CardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.card}>
      <img src={image} alt="HousPic" />
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          <h2>{title}</h2>
          <span>{price}</span>
        </div>
        <span className={styles.numberH}>{location}</span>
        <div className={styles.cardDetails}>
          <span>
            <Ruler size={15} /> {size}
          </span>
          <span>
            <Bed size={15} /> {rooms} חדרים
          </span>
          <div>
            <Bath size={15} />
            {baths} <span>חדרי רחצה</span>
          </div>
        </div>
        <div className={styles.cardActions}>
          <Link to={"/search"}>פרטים נוספים</Link>
          <a href="#" className={styles.call} rel="noopener noreferrer">
            <Phone size={15} />
            צור קשר
          </a>
        </div>
      </div>
      <button className={styles.heart} onClick={() => setIsActive(!isActive)}>
        <Heart size={20} className={isActive ? styles.active : ""} />
      </button>

      <span className={`${styles.spanTop} ${forSale ? styles.blue : ""}`}>
        {forSale ? "למכירה" : "להשכרה"}
      </span>
    </div>
  );
}

export default Card;
