import React, { useEffect, useState } from "react";
import styles from "./../styles/AddCard.module.css";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import DropdownSelect from "./../componenet/DropdownSelect";
import { RootState, AppDispatch } from "../redux/store";
import { setCards } from "./../redux/slices/cardReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCard } from "./../redux/slices/cardReducer";
import BlockedAccount from "../componenet/BlockedAccount";

function AddCard() {
  const loading = useSelector((state: RootState) => state.cards.loadingCard);
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    toast.error("נא להתחבר כדי לפרסם נכס חדש");
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.cards.items);
  const [status, setStatus] = useState({
    status: "למכירה",
    isOpen: false,
  });

  const [type, setType] = useState({
    type: "דירה",
    isOpen: false,
  });

  const [city, setCity] = useState({
    city: "תל אביב",
    isOpen: false,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [size, setSize] = useState("");
  const [rooms, setRooms] = useState("");
  const [baths, setBaths] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const handleFeatureToggle = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleDropdownSelect = (
    key: "status" | "type" | "city",
    value: string
  ) => {
    if (key === "status") setStatus({ status: value, isOpen: false });
    if (key === "type") setType({ type: value, isOpen: false });
    if (key === "city") setCity({ city: value, isOpen: false });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isCheckbox = target.closest("input[type='checkbox'], label");

      if (isCheckbox) return;

      setStatus((prev) => ({ ...prev, isOpen: false }));
      setType((prev) => ({ ...prev, isOpen: false }));
      setCity((prev) => ({ ...prev, isOpen: false }));
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (!title || !description || !price || !size || !rooms || !baths) {
      toast.error("נא למלא את כל השדות החובה!");
      return;
    }

    const newCard = {
      title,
      description,
      price: `${price} ₪ / חודש`,
      location: `${neighborhood}, ${city.city}`,
      size: `${size} מ"ר`,
      rooms: Number(rooms),
      baths: Number(baths),
      image: "./assets/hous.avif",
      forSale: status.status === "למכירה",
      datePosted: new Date().toISOString().split("T")[0],
      features,
      owner: user.username,
      type: type.type,
    };

    dispatch(createCard(newCard));
    setTitle("");
    setDescription("");
    setPrice("");
    setNeighborhood("");
    setStreet("");
    setStreetNumber("");
    setFloor("");
    setTotalFloors("");
    setSize("");
    setRooms("");
    setBaths("");
    setFeatures([]);
    setStatus({ status: "למכירה", isOpen: false });
    setType({ type: "דירה", isOpen: false });
    setCity({ city: "תל אביב", isOpen: false });
    toast.success("המודעה פורסמה בהצלחה!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (user.status === "blocked") {
    return <BlockedAccount />;
  }

  return (
    <div className={styles.addCardContainer}>
      <Link to="/search" className={styles.addCardButton}>
        <ArrowRight size={15} className={styles.addCardIcon} /> חזרה לרשימת
        הנכסים
      </Link>
      <h1 style={{ color: "#172f64", fontSize: "1.2rem" }}>פרסום נכס חדש</h1>

      <div className={styles.addCardInfo}>
        <h2>הנחיות לפרסום נכס</h2>
        <ul className={styles.addCardGuidelines}>
          <li>מלא את כל שדות החובה המסומנים ב-*</li>
          <li>תיאור מפורט ותמונות איכותיות יגדילו את סיכויי המכירה/השכרה</li>
          <li>ציין את כל המאפיינים החשובים של הנכס</li>
          <li>וודא שהמחיר שהזנת הוא המחיר הנכון והסופי</li>
          <li>
            המודעה תפורסם לאחר אישור צוות האתר, תהליך שעשוי לקחת עד 24 שעות
          </li>
        </ul>
      </div>

      <div className={styles.addCardGlopInfoHeader}>
        {/* glop info */}
        <div className={styles.addCardGlopInfo}>
          <h1>מידע בסיסי</h1>
          <div className={styles.addCardGlopForm}>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="title">כותרת*</label>
              <input
                type="text"
                id="title"
                placeholder="דירת 4 חדרים מרווחת"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="des">תיאור*</label>

              <textarea
                id="des"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="תאר את הנכס בפירוט: יתרונות, מיקום, שיפוצים וכו'"
              ></textarea>
            </div>

            <div className={styles.addCardsPayment}>
              <div className={styles.addCardGlopInputsLa}>
                <label htmlFor="price">מחיר*</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  placeholder="מחיר המבוקש בשקלים"
                  required
                />
              </div>
              <DropdownSelect
                label="סטטוס*"
                value={status.status}
                options={["למכירה", "להשכרה"]}
                isOpen={status.isOpen}
                setIsOpen={(open: boolean) => {
                  setStatus((prev) => ({ ...prev, isOpen: open }));
                  setType((prev) => ({ ...prev, isOpen: false }));
                  setCity((prev) => ({ ...prev, isOpen: false }));
                }}
                onSelect={(val: string) =>
                  setStatus({ status: val, isOpen: false })
                }
              />
            </div>

            <DropdownSelect
              label="סוג נכס*"
              value={type.type}
              options={[
                "דירה",
                "בית פרטי",
                "מגרש",
                "פנטהאוז",
                "דירת גן",
                "דופלקס",
                "מסחרי",
              ]}
              isOpen={type.isOpen}
              setIsOpen={(open) => {
                setType((prev) => ({ ...prev, isOpen: open }));
                setStatus((prev) => ({ ...prev, isOpen: false }));
                setCity((prev) => ({ ...prev, isOpen: false }));
              }}
              onSelect={(val) => setType({ type: val, isOpen: false })}
            />
          </div>
        </div>

        {/* form */}
        <div className={styles.addCardForm}>
          <h1>מיקום</h1>
          <label htmlFor="city">עיר*</label>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setCity((prev) => ({ ...prev, isOpen: !prev.isOpen }));
              setType((prev) => ({ ...prev, isOpen: false }));
              setStatus((prev) => ({ ...prev, isOpen: false }));
            }}
          >
            <div className={styles.statusSelector}>
              <ArrowDown
                className={`${styles.Icon} ${city.isOpen ? styles.rotate : ""}`}
              />
              {city.city}

              {city.isOpen && (
                <div className={styles.statusDropdown}>
                  {[
                    "תל אביב",
                    "ירושלים",
                    "חיפה",
                    "ראשון לציון",
                    "פתח תקווה",
                    "אשדוד",
                    "נתניה",
                  ].map((option) => (
                    <button
                      key={option}
                      className={`${city.city === option ? styles.active : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownSelect("city", option);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.addCardGlopInputsLa}>
            <label htmlFor="floor">שכונה</label>
            <input
              type="text"
              id="floor"
              placeholder="שכונה"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>
          <div className={styles.StreetNumber}>
            <div className={styles.addCardGlopInputsLa} style={{ flex: 2 }}>
              <label htmlFor="street">רחוב</label>
              <input
                type="text"
                id="street"
                placeholder="רחוב"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className={styles.addCardGlopInputsLa} style={{ flex: 1 }}>
              <label htmlFor="number">מספר בית</label>
              <input
                type="number"
                id="number"
                placeholder="מספר בית"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.StreetNumber}>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="floor">קומה</label>
              <input
                type="number"
                id="floor"
                placeholder="קומה"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="floors">מספר קומות בבניין</label>
              <input
                type="number"
                id="floors"
                placeholder="מספר קומות בבניין"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.line} />

        <div className={styles.addCardGlopInfo2}>
          <h1>מאפייני הנכס</h1>
          <div className={styles.addCardGlopInputsLa}>
            <label htmlFor="met">גודל במ"ר*</label>
            <input
              type="number"
              id="met"
              placeholder="גודל הנכס במ"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className={styles.StreetNumber}>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="room">חדרים*</label>
              <input
                type="number"
                id="room"
                placeholder="מספר חדרים"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>
            <div className={styles.addCardGlopInputsLa}>
              <label htmlFor="bathroom">חדרי רחצה*</label>
              <input
                type="number"
                id="bathroom"
                placeholder="מספר חדרי רחצה"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.checkboxContainer1}>
          <h1>מאפיינים נוספים</h1>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="parking"
                checked={features.includes("חניה")}
                onChange={() => handleFeatureToggle("חניה")}
              />
              <label htmlFor="parking">חניה</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="balcony"
                checked={features.includes("מרפסת")}
                onChange={() => handleFeatureToggle("מרפסת")}
              />
              <label htmlFor="balcony">מרפסת</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="elevator"
                checked={features.includes("מעלית")}
                onChange={() => handleFeatureToggle("מעלית")}
              />
              <label htmlFor="elevator">מעלית</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="furnished"
                checked={features.includes("ריהוט")}
                onChange={() => handleFeatureToggle("ריהוט")}
              />
              <label htmlFor="furnished">ריהוט</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="ac"
                checked={features.includes("מיזוג")}
                onChange={() => handleFeatureToggle("מיזוג")}
              />
              <label htmlFor="ac">מיזוג</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="storage"
                checked={features.includes("מחסן")}
                onChange={() => handleFeatureToggle("מחסן")}
              />
              <label htmlFor="storage">מחסן</label>
            </div>
          </div>
        </div>

        <div className={styles.btnsContainer}>
          <Link to={"/"}>ביטול</Link>
          <button
            className={styles.addCardSubmitButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "שולח..." : "פרסם נכס"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
