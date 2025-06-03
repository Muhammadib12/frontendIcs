// components/CardShimmer.tsx
import styles from "./../styles/CardShimmer.module.css";

function CardShimmer() {
  return (
    <div className={styles.card + " " + styles.shimmer}>
      <div className={styles.imageShimmer} />
      <div className={styles.textShimmer} />
      <div className={styles.textShimmerShort} />
    </div>
  );
}

export default CardShimmer;
