import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import styles from "./../styles/SearchHo.module.css";
import SearchResult from "../componenet/SearchResult";
import { useDispatch } from "react-redux";
import { setFilters } from "./../redux/slices/filterSlice";
function SearchHo() {
  const prices = [
    "₪ 500,000",
    "₪ 1,000,000",
    "₪ 1,500,000",
    "₪ 2,000,000",
    "₪ 3,000,000",
  ];

  const dispatch = useDispatch();

  const [valueType, setValueType] = useState<string>("בחר סוג נכס");
  const [typeOpen, setTypeOpen] = useState<boolean>(false);

  const [cityValue, setCityValue] = useState<string>("בחר עיר");
  const [cityOpen, setCityOpen] = useState<boolean>(false);

  const [priceMin, setPriceMin] = useState<string>("מינימום");
  const [priceMinOpen, setPriceMinOpen] = useState<boolean>(false);

  const [priceMax, setPriceMax] = useState<string>("מקסימום");
  const [priceMaxOpen, setPriceMaxOpen] = useState<boolean>(false);

  const [payMin, setPayMin] = useState<string>("מינימום");
  const [payMinOpen, setPayMinOpen] = useState<boolean>(false);

  const [payMax, setPayMax] = useState<string>("מקסימום");
  const [payMaxOpen, setPayMaxOpen] = useState<boolean>(false);

  const [barOpen, setBarOpen] = useState<boolean>(false);

  const [minSize, setMinSize] = useState<number | null>(null);
  const [maxSize, setMaxSize] = useState<number | null>(null);

  const [features, setFeatures] = useState<string[]>([]);

  const [status, setStatus] = useState("הכל");

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      setFeatures((prev) => [...prev, id]);
    } else {
      setFeatures((prev) => prev.filter((feature) => feature !== id));
    }
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const selectedValue = e.currentTarget.innerText;
    setValueType(selectedValue);
    setTypeOpen(false);
  };

  const handleBtnCityClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const selectedValue = e.currentTarget.innerText;
    setCityValue(selectedValue);
    setCityOpen(false);
  };

  const handleMinPrice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedValue = e.currentTarget.innerHTML;
    setPriceMin(selectedValue);
    setPriceMinOpen(false);
  };

  const handleMaxPrice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedValue = e.currentTarget.innerHTML;
    setPriceMax(selectedValue);
    setPriceMaxOpen(false);
  };

  const handlePayMin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedValue = e.currentTarget.innerHTML;
    setPayMin(selectedValue);
    setPayMinOpen(false);
  };

  const handlePayMax = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedValue = e.currentTarget.innerHTML;
    setPayMax(selectedValue);
    setPayMaxOpen(false);
  };

  const setAllClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCityOpen(false);
    setTypeOpen(false);
    setPriceMaxOpen(false);
    setPriceMinOpen(false);
    setPayMinOpen(false);
    setPayMaxOpen(false);
  };

  const handleSearch = () => {
    const parsedMinRoom = priceMin === "מינימום" ? 0 : Number(priceMin);
    const parsedMaxRoom =
      priceMax === "מקסימום" || priceMax === "+5" ? Infinity : Number(priceMax);

    dispatch(
      setFilters({
        city: cityValue,
        type: valueType,
        minPrice: payMin,
        maxPrice: payMax,
        minRoom: parsedMinRoom,
        maxRoom: parsedMaxRoom,
        sizeMmi: minSize || 0,
        sizeMma: maxSize || Infinity,
        features,
        status: status,
      })
    );
  };

  return (
    <div
      className={styles.searchContainer}
      onClick={(e: any) => setAllClose(e)}
    >
      <h1>חיפוש נכסים</h1>
      <div className={styles.searchBar}>
        <div className={styles.serachCon}>
          <div className={styles.searchInput}>
            <h2>סוג נכס</h2>
            <div
              className={styles.select}
              onClick={(e) => {
                setTypeOpen((prev) => !prev), e.stopPropagation();
                setCityOpen(false);
                setPriceMaxOpen(false);
                setPriceMinOpen(false);
                setPayMinOpen(false);
                setPayMaxOpen(false);
              }}
            >
              <ChevronDown
                size={20}
                className={typeOpen ? styles.rotate : ""}
                style={{ transition: "all .3s ease-in-out" }}
              />
              <span>{valueType}</span>
              {typeOpen && (
                <div className={styles.dropItems}>
                  <button onClick={(e) => handleBtnClick(e)}>דירה</button>
                  <button onClick={(e) => handleBtnClick(e)}>מגרש</button>
                  <button onClick={(e) => handleBtnClick(e)}>בית פרטי</button>
                  <button onClick={(e) => handleBtnClick(e)}>דירת גן</button>
                  <button onClick={(e) => handleBtnClick(e)}>דופלקס</button>
                  <button onClick={(e) => handleBtnClick(e)}>פנטהאוז</button>
                  <button onClick={(e) => handleBtnClick(e)}>מסחרי</button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.searchInput}>
            <h2>עיר</h2>
            <div
              className={styles.select}
              onClick={(e) => {
                setCityOpen((prev) => !prev), e.stopPropagation();
                setTypeOpen(false);
                setPriceMinOpen(false);
                setPriceMaxOpen(false);
                setPayMinOpen(false);
                setPayMaxOpen(false);
              }}
            >
              <ChevronDown
                size={20}
                className={cityOpen ? styles.rotate : ""}
                style={{ transition: "all .3s ease-in-out" }}
              />
              <span>{cityValue}</span>
              {cityOpen && (
                <div className={styles.dropItems}>
                  <button onClick={(e) => handleBtnCityClick(e)}>
                    תל אביב
                  </button>
                  <button onClick={(e) => handleBtnCityClick(e)}>
                    ירושלים
                  </button>
                  <button onClick={(e) => handleBtnCityClick(e)}>חיפה</button>
                  <button onClick={(e) => handleBtnCityClick(e)}>רעננה</button>
                  <button onClick={(e) => handleBtnCityClick(e)}>הרצליה</button>
                  <button onClick={(e) => handleBtnCityClick(e)}>רמת גן</button>
                  <button onClick={(e) => handleBtnCityClick(e)}>
                    באר שבע
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.search2Con}>
          <div className={styles.searchInput2}>
            <h2>חדרים</h2>
            <div className={styles.select2}>
              <div
                className={styles.select2dropdown}
                onClick={(e) => {
                  e.stopPropagation();
                  setPriceMinOpen((prev) => !prev);
                  setTypeOpen(false);
                  setCityOpen(false);
                  setPriceMaxOpen(false);
                  setPayMinOpen(false);
                  setPayMaxOpen(false);
                }}
              >
                <ChevronDown
                  size={20}
                  className={priceMinOpen ? styles.rotate : ""}
                  style={{ transition: "all .3s ease-in-out" }}
                />
                <span>{priceMin}</span>
                {priceMinOpen && (
                  <div className={styles.dropItems}>
                    <button onClick={(e) => handleMinPrice(e)}>1</button>
                    <button onClick={(e) => handleMinPrice(e)}>2</button>
                    <button onClick={(e) => handleMinPrice(e)}>3</button>
                    <button onClick={(e) => handleMinPrice(e)}>4</button>
                    <button onClick={(e) => handleMinPrice(e)}>+5</button>
                  </div>
                )}
              </div>

              <div
                className={styles.select2dropdown}
                onClick={(e) => {
                  e.stopPropagation();
                  setPriceMaxOpen((prev) => !prev);
                  setTypeOpen(false);
                  setCityOpen(false);
                  setPriceMinOpen(false);
                  setPayMinOpen(false);
                  setPayMaxOpen(false);
                }}
              >
                <ChevronDown
                  size={20}
                  className={priceMaxOpen ? styles.rotate : ""}
                  style={{ transition: "all .3s ease-in-out" }}
                />
                <span>{priceMax}</span>
                {priceMaxOpen && (
                  <div className={styles.dropItems}>
                    <button onClick={(e) => handleMaxPrice(e)}>1</button>
                    <button onClick={(e) => handleMaxPrice(e)}>2</button>
                    <button onClick={(e) => handleMaxPrice(e)}>3</button>
                    <button onClick={(e) => handleMaxPrice(e)}>4</button>
                    <button onClick={(e) => handleMaxPrice(e)}>+5</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.searchInput2}>
            <h2>טווח מחירים</h2>
            <div className={styles.select2}>
              <div
                className={styles.select2dropdown}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setPayMinOpen((prev) => !prev);
                  setCityOpen(false);
                  setTypeOpen(false);
                  setPriceMaxOpen(false);
                  setPriceMinOpen(false);
                  setPayMaxOpen(false);
                }}
              >
                <ChevronDown
                  size={20}
                  className={payMinOpen ? styles.rotate : ""}
                  style={{ transition: "all .3s ease-in-out" }}
                />
                <span>{payMin}</span>
                {payMinOpen && (
                  <div className={styles.dropItems}>
                    {prices.map((price, id) => (
                      <button
                        key={id}
                        onClick={(e) => handlePayMin(e)}
                        className={payMin === price ? styles.v : ""}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={styles.select2dropdown}
                onClick={(e) => {
                  e.stopPropagation();
                  setCityOpen(false);
                  setTypeOpen(false);
                  setPriceMaxOpen(false);
                  setPriceMinOpen(false);
                  setPayMinOpen(false);
                  setPayMaxOpen((prev) => !prev);
                }}
              >
                <ChevronDown
                  size={20}
                  className={payMaxOpen ? styles.rotate : ""}
                  style={{ transition: "all .3s ease-in-out" }}
                />
                <span>{payMax}</span>
                {payMaxOpen && (
                  <div className={styles.dropItems}>
                    {prices.map((price, id) => (
                      <button
                        key={id}
                        onClick={(e) => handlePayMax(e)}
                        className={payMax === price ? styles.v : ""}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.openBottom}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBarOpen((prev) => !prev);
            setAllClose(e);
          }}
        >
          <span>סינון מתקדם</span>
          <ChevronDown
            size={15}
            className={barOpen ? styles.rotate : ""}
            style={{ transition: "all .3s ease-in-out" }}
          />
        </div>
        {barOpen && (
          <div className={styles.outerBar}>
            <div className={styles.numberinp}>
              <h2>גודל במ"ר</h2>
              <div className={styles.inputs}>
                <input
                  type="number"
                  placeholder="מינימום"
                  onChange={(e) => setMinSize(Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="מקסימום"
                  onChange={(e) => setMaxSize(Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.parts}>
              <h2>מאפיינים</h2>
              <div className={styles.flexTh}>
                <div className={styles.check}>
                  <input
                    id="מרפסת"
                    type="checkbox"
                    onChange={handleFeatureChange}
                  />
                  <label htmlFor="מרפסת">מרפסת</label>
                </div>
                <div className={styles.check}>
                  <input
                    id="מחסן"
                    type="checkbox"
                    onChange={handleFeatureChange}
                  />
                  <label htmlFor="מחסן">מחסן</label>
                </div>
                <div className={styles.check}>
                  <input
                    id="חניה"
                    type="checkbox"
                    onChange={handleFeatureChange}
                  />
                  <label htmlFor="חניה">חניה</label>
                </div>
                <div className={styles.check}>
                  <input
                    id="מעלית"
                    type="checkbox"
                    onChange={handleFeatureChange}
                  />
                  <label htmlFor="מעלית">מעלית</label>
                </div>
              </div>
            </div>

            <form className={styles.formOuter}>
              <h2>סטטוס</h2>
              <div className={styles.form}>
                <div className={styles.radio}>
                  <input
                    id="להשכרה"
                    type="radio"
                    name="status"
                    value="להשכרה"
                    checked={status === "להשכרה"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label htmlFor="להשכרה">להשכרה</label>
                </div>
                <div className={styles.radio}>
                  <input
                    id="למכירה"
                    type="radio"
                    name="status"
                    value="למכירה"
                    checked={status === "למכירה"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label htmlFor="למכירה">למכירה</label>
                </div>
                <div className={styles.radio}>
                  <input
                    id="הכל"
                    type="radio"
                    name="status"
                    value="הכל"
                    checked={status === "הכל"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label htmlFor="הכל">הכל</label>
                </div>
              </div>
            </form>
          </div>
        )}
        <div className={styles.searchbtn} onClick={handleSearch}>
          <button>חפש נכסים</button>
          <Search size={16} className={styles.icon} />
        </div>
      </div>

      <SearchResult />
    </div>
  );
}

export default SearchHo;
