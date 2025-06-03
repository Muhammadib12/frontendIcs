
import styles from "./../styles/ShiemmerAll.module.css";
function ShiemmerAll() {
  return (
    <div className={styles.Container}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.title1} />
        <div className={styles.dad}>
          <div className={styles.btns}>
            <div className={styles.button} />
            <div className={styles.button} />
          </div>
          <div className={styles.circle} />
        </div>

        <div className={styles.search} />
      </div>
      <div className={styles.content}>
        {[...Array(6)].map((_, i) => (
          <div className={styles.card} key={i} />
        ))}
      </div>
      <div className={styles.footer} />
    </div>
  );
}

export default ShiemmerAll;
