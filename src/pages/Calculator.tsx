import { Download, Mail, OctagonAlert } from "lucide-react";
import React, { useState } from "react";
import styles from "./../styles/Calculator.module.css";

import downloadPDF from "./../utils/download.ts";
import calculateMortgage from "../utils/calculateMortgage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import BlockedAccount from "../componenet/BlockedAccount.tsx";

function Calculator() {
  const [first, setIsFirst] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const minRe = 1;
  const maxRe = 8;
  const defaultRe = (minRe + maxRe) / 2;
  const defaultFill = defaultRe;

  const [valueMonth, setValueMonth] = useState(15);
  const [valueRe, setValueRe] = useState(defaultFill);
  const [firstValue, setFirstValue] = useState<string>("1500000");
  const [secValue, setSecValue] = useState<string>("450000");

  const [result, setResult] = useState<{
    loanAmount: number;
    monthly: number;
    totalInterest: number;
    totalPayment: number;
    monthlySplit: {
      prime: number;
      fixed: number;
      variable: number;
    };
  } | null>(null);

  const [prime, setPrime] = useState(33);
  const [fixed, setFixed] = useState(33);
  const [variable, setVariable] = useState(34);

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = Number(e.target.value);
    setter(value);
  };

  const handleSliderChange = (
    newVal: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    other1: number,
    other2: number,
    setOther1: React.Dispatch<React.SetStateAction<number>>,
    setOther2: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const val = Math.max(0, Math.min(newVal, 100));
    setter(val);
    const remaining = 100 - val;
    const sumOthers = other1 + other2;

    if (sumOthers === 0) {
      setOther1(Math.floor(remaining / 2));
      setOther2(remaining - Math.floor(remaining / 2));
    } else {
      const ratio1 = other1 / sumOthers;
      const new1 = Math.round(remaining * ratio1);
      const new2 = 100 - val - new1;
      setOther1(new1);
      setOther2(new2);
    }
  };

  if (user?.status === "blocked") {
    return <BlockedAccount />;
  }

  return (
    <div className={styles.claclCon}>
      <h1 className={styles.ConTitle}>מחשבון משכנתא</h1>
      <div className={styles.ConBtnTitle}>
        <button
          className={`${first === true ? styles.active : ""}`}
          onClick={() => setIsFirst(true)}
        >
          מחשבון
        </button>
        <button
          className={`${first === false ? styles.active : ""}`}
          onClick={() => setIsFirst(false)}
        >
          מידע שימושי
        </button>
      </div>

      {first ? (
        <div className={styles.CalcContent}>
          <div className={styles.firstPartContent}>
            {/* Input fields and ranges here (no changes) */}
            <button
              className={styles.CalcBtn}
              onClick={() => {
                const result1 = calculateMortgage({
                  firstValue: Number(firstValue),
                  secValue: Number(secValue),
                  months: valueMonth,
                  annualRate: valueRe,
                  prime,
                  fixed,
                  variable,
                });

                setResult(result1);
              }}
            >
              חשב משכנתא
            </button>
          </div>

          {/* Result rendering and PDF/email actions (no change) */}
        </div>
      ) : (
        <div className={styles.information}>
          {/* Useful info section (no change) */}
        </div>
      )}
    </div>
  );
}

export default Calculator;
