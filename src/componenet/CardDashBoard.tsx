import { TrendingUp, TrendingDown } from "lucide-react";
import React from "react";
import styles from "./../styles/CardDashBoard.module.css";

interface CardDashBoardProps {
  title: string;
  value: string | number;

  icon: React.ReactNode;
  change: number;
}

function CardDashBoard({
  title,
  value,

  icon,
  change,
}: CardDashBoardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  const ChangeIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : null;

  const changeText = `${Math.abs(change)}% מהחודש הקודם`;
  const changeClass = isPositive
    ? styles.greenText
    : isNegative
    ? styles.redText
    : styles.neutralText;

  return (
    <div className={styles.card}>
      <p>{title}</p>
      <div className={styles.valueRow}>
        <span>{value}</span>
        {icon}
      </div>
      <div className={`${styles.changeRow} ${changeClass}`}>
        {ChangeIcon && <ChangeIcon size={16} />}
        <span>{changeText}</span>
      </div>
    </div>
  );
}

export default CardDashBoard;
