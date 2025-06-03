import { Plus } from "lucide-react";

import styles from "./../styles/MyCards.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "../componenet/Card";
import BlockedAccount from "./BlockedAccount";

function MyCards() {
  const user = useSelector((state: RootState) => state.auth.user);
  const cards = useSelector((state: RootState) => state.cards.items);

  // فقط الكروت التي تخص هذا المستخدم
  const myCards = cards.filter((card) => card.owner === user?.username);

  if (user?.status === "blocked") {
    return <BlockedAccount />;
  }

  return (
    <div className={styles.myCards}>
      <div className={styles.header}>
        <h1>הנכסים שלי</h1>
        <Link to={"/addcard"} className={styles.addPropertyButton}>
          הוסף נכס חדש <Plus size={15} />
        </Link>
      </div>

      {myCards.length === 0 ? (
        <div className={styles.noProperties}>
          <h3>טרם פרסמת נכסים במערכת</h3>
          <Link to={"/addcard"} className={styles.addPropertyButton}>
            פרסם נכס ראשון <Plus size={15} />
          </Link>
        </div>
      ) : (
        <div className={styles.myCardsContainer}>
          {myCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCards;
