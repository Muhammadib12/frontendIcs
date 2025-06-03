import React, { useState } from "react";
import styles from "./../styles/SearchResult.module.css";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "./../redux/store";
import Card from "./Card";
function SearchResult() {
  const cards = useSelector((state: RootState) => state.cards.items);
  const filters = useSelector((state: RootState) => state.filters);
  const sorts = [
    "הכי חדש",
    "מחיר (מהנמוך לגבוה)",
    "מחיר (מהגבוה לנמוך)",
    "שטח (מהגדול לקטן)",
  ];

  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);

  const [currentPage, setCurrenPage] = useState<number>(1);

  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [dropValue, setDropValue] = useState<string>("מייו לפי");
  const getFilteredCards = () => {
    return cards.filter((card) => {
      const priceNum = Number(card.price.replace(/[^\d]/g, ""));
      const minPrice = Number(filters.minPrice.replace(/[^\d]/g, "")) || 0;
      const maxPrice =
        Number(filters.maxPrice.replace(/[^\d]/g, "")) || Infinity;
      const sizeNum = Number(card.size.replace(/[^\d]/g, ""));
      const minSize = filters.sizeMmi || 0;
      const maxSize = filters.sizeMma || Infinity;
      const featuresSelected = filters.features || [];

      return (
        (filters.city === "בחר עיר" || card.location.includes(filters.city)) &&
        (filters.type === "בחר סוג נכס" || card.title.includes(filters.type)) &&
        (filters.maxRoom === 0 || card.rooms >= filters.minRoom) &&
        (filters.maxRoom === 0 || card.rooms <= filters.maxRoom) &&
        featuresSelected.every((feature) => card.features.includes(feature)) &&
        (filters.status === "הכל" ||
          (filters.status === "למכירה" && card.forSale) ||
          (filters.status === "להשכרה" && !card.forSale)) &&
        sizeNum >= minSize &&
        sizeNum <= maxSize &&
        priceNum >= minPrice &&
        priceNum <= maxPrice
      );
    });
  };

  const getSortedCards = () => {
    const sorted = [...getFilteredCards()];

    switch (dropValue) {
      case "מחיר (מהנמוך לגבוה)":
        return sorted.sort(
          (a, b) =>
            Number(a.price.replace(/[^\d]/g, "")) -
            Number(b.price.replace(/[^\d]/g, ""))
        );
      case "מחיר (מהגבוה לנמוך)":
        return sorted.sort(
          (a, b) =>
            Number(b.price.replace(/[^\d]/g, "")) -
            Number(a.price.replace(/[^\d]/g, ""))
        );
      case "שטח (מהגדול לקטן)":
        return sorted.sort(
          (a, b) =>
            Number(b.size.replace(/[^\d]/g, "")) -
            Number(a.size.replace(/[^\d]/g, ""))
        );
      case "הכי חדש":
      default:
        return sorted.sort((a, b) => {
          const dateA = new Date(a.datePosted).getTime();
          const dateB = new Date(b.datePosted).getTime();
          return dateB - dateA;
        });
    }
  };

  const handleDropOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedValue = e.currentTarget.innerText.trim();

    setDropValue(selectedValue);
    setDropOpen(false);
  };

  const cardsPerPage = 5;

  const sortedCards = getSortedCards();
  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);

  const paginatedCards = sortedCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  if (paginatedCards.length === 0) {
    return (
      <div className={`${styles.searchResultCon} `}>
        <div className={styles.shimmer} />
        <div className={styles.notFound}>
          <h1>לא נמצאו נכסים</h1>
          <span>נסה לשנות את פרמטרי החיפוש או לבטל חלק מהמסננים</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.searchResultCon}>
      <div className={styles.searchResHeader}>
        <h2>נמצאו {sortedCards.length} נכסים</h2>
        <div className={styles.sortDrop}>
          <div
            className={styles.dropDownCon}
            onClick={(e) => {
              e.stopPropagation();
              setDropOpen((prev) => !prev);
            }}
          >
            <ChevronDown
              size={20}
              className={dropOpen ? styles.rotate : ""}
              style={{ transition: "all .3s ease-in-out" }}
            />
            <span>{dropValue}</span>
            {dropOpen && (
              <div className={styles.dropItems}>
                {sorts.map((value, id) => (
                  <button
                    key={id}
                    onClick={(e) => {
                      handleDropOpen(e);
                    }}
                    className={dropValue === value ? styles.or : ""}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.headerHomeContentCards}>
        {paginatedCards.map((card) => (
          <Card key={card.id + "-" + card.price} {...card} />
        ))}
      </div>

      <div className={styles.bottom}>
        <div
          className={`${styles.arrow} ${styles.prev}`}
          onClick={(e) => {
            e.stopPropagation();
            if (currentPage <= 1) return;

            const prevPage = currentPage - 1;
            setCurrenPage(prevPage);

            if (prevPage < startIndex + 1) {
              setStartIndex((prev) => Math.max(prev - 1, 0));
            }
          }}
        >
          <ArrowRight size={16} className={styles.icon} />
          <span>Previous</span>
        </div>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(startIndex, startIndex + visibleCount)
          .map((page) => (
            <span
              key={page}
              className={`${styles.pageNumber} ${
                currentPage === page ? styles.current : ""
              }`}
              onClick={() => {
                setCurrenPage(page);

                setCurrenPage(page);
              }}
            >
              {page}
            </span>
          ))}

        <div
          className={`${styles.arrow} ${styles.next}`}
          onClick={(e) => {
            e.stopPropagation();
            if (currentPage >= totalPages) return;

            const nextPage = currentPage + 1;
            setCurrenPage(nextPage);

            if (nextPage > startIndex + visibleCount - 1) {
              setStartIndex((prev) => prev + 1);
            }
          }}
        >
          <span>Next</span>
          <ArrowLeft size={16} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
