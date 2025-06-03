// components/DropdownSelect.tsx
import { ArrowDown } from "lucide-react";
import styles from "./../styles/AddCard.module.css";

interface DropdownSelectProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (value: string) => void;
}

const DropdownSelect = ({
  label,
  value,
  options,
  isOpen,
  setIsOpen,
  onSelect,
}: DropdownSelectProps) => {
  return (
    <div className={styles.addCardGlopInputsLa}>
      <label>{label}</label>
      <div
        className={styles.statusSelector}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {value}
        <ArrowDown
          className={`${styles.Icon} ${isOpen ? styles.rotate : ""}`}
        />
        {isOpen && (
          <div className={styles.statusDropdown}>
            {options.map((option) => (
              <button
                key={option}
                className={value === option ? styles.active : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSelect;
