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

  // const result = calculateMortgage({
  //   firstValue: Number(firstValue),
  //   secValue: Number(secValue),
  //   months: valueMonth,
  //   annualRate: valueRe,
  //   prime,
  //   fixed,
  //   variable,
  // });

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
            <div className={styles.Rangeone}>
              <div className={styles.inputs}>
                <label htmlFor="מחיר הנכס">מחיר הנכס ₪</label>
                <div className={styles.input}>
                  <input
                    type="number"
                    id="מחיר הנכס"
                    value={firstValue}
                    onChange={(e) => setFirstValue(e.target.value)}
                    dir="ltr"
                  />
                  <span style={{ color: "gray" }}>₪</span>
                </div>
              </div>
              <div className={styles.inputs}>
                <label htmlFor="הון עצמי">הון עצמי ₪</label>
                <div className={styles.input}>
                  <input
                    type="number"
                    id="הון עצמי"
                    value={secValue}
                    dir="ltr"
                    onChange={(e) => setSecValue(e.target.value)}
                  />
                  <span style={{ color: "gray" }}>₪</span>
                </div>
              </div>
            </div>

            <div className={styles.firstRange}>
              <div className={styles.rangeSlide}>
                <span>תקופת המשכנתא (חודשים)</span>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={valueMonth}
                  onChange={(e) => handleRangeChange(e, setValueMonth)}
                  className={styles.slider}
                  style={
                    {
                      "--fill": `${((valueMonth - 5) / 25) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className={styles.rangContent}>
                  <span>30</span>
                  <div className={styles.month}>
                    <span>{valueMonth}</span>
                    <span>חודשים</span>
                  </div>
                  <span>5</span>
                </div>
              </div>
              <div className={styles.rangeSlide}>
                <span>ריבית שנתית (%)</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.1"
                  value={valueRe}
                  onChange={(e) => handleRangeChange(e, setValueRe)}
                  className={styles.slider}
                  style={
                    {
                      "--fill": `${((valueRe - 1) / 7) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <div className={styles.rangContent}>
                  <span>8%</span>
                  <span>{valueRe.toFixed(1)}%</span>
                  <span>1%</span>
                </div>
              </div>
            </div>

            <h1
              style={{
                fontFamily: "monospace",
                fontSize: "1.3rem",
                color: "#172f64",
                padding: ".4rem",
                margin: "0 auto",
                width: "100%",
              }}
            >
              מסלולי משכנתא
            </h1>

            <div className={styles.secSlide}>
              <div className={styles.Range}>
                <div className={styles.RangeContent}>
                  <span>פריים</span>
                  <span>{prime}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={prime}
                  onChange={(e) =>
                    handleSliderChange(
                      Number(e.target.value),
                      setPrime,
                      prime,
                      fixed,
                      variable,
                      setFixed,
                      setVariable
                    )
                  }
                  style={{ "--fill": `${prime}%` } as React.CSSProperties}
                />
              </div>
              <div className={styles.Range}>
                <div className={styles.RangeContent}>
                  <span>קבועה צמודה</span>
                  <span>{fixed}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fixed}
                  onChange={(e) =>
                    handleSliderChange(
                      Number(e.target.value),
                      setFixed,
                      fixed,
                      prime,
                      variable,
                      setPrime,
                      setVariable
                    )
                  }
                  style={{ "--fill": `${fixed}%` } as React.CSSProperties}
                />
              </div>
              <div className={styles.Range}>
                <div className={styles.RangeContent}>
                  <span>משתנה לא צמודה</span>
                  <span>{variable}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={variable}
                  onChange={(e) =>
                    handleSliderChange(
                      Number(e.target.value),
                      setVariable,
                      variable,
                      prime,
                      fixed,
                      setPrime,
                      setFixed
                    )
                  }
                  style={{ "--fill": `${variable}%` } as React.CSSProperties}
                />
              </div>
            </div>

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
;

                setResult(result1);
              }}
            >
              חשב משכנתא
            </button>
          </div>

          <div className={styles.calcResult}>
            <h2>תוצאות המשכנתא</h2>
            <div className={styles.CalcResultNum}>
              <span>סכום המשכנתא:</span>
              <span dir="ltr">
                {result ? result.loanAmount.toLocaleString() : "-"} ₪
              </span>
            </div>
            <div className={styles.CalcResultNum}>
              <span>תשלום חודשי:</span>
              <span dir="ltr">
                {result ? result.monthly.toLocaleString() : "-"} ₪
              </span>
            </div>
            <div className={styles.CalcResultNum}>
              <span>סה\"כ ריבית:</span>
              <span style={{ color: "orange" }} dir="ltr">
                {result ? result.totalInterest.toLocaleString() : "-"} ₪
              </span>
            </div>
            <div className={styles.CalcResultNum}>
              <span>סה\"כ תשלומים:</span>
              <span dir="ltr">
                {result ? result.totalPayment.toLocaleString() : "-"} ₪
              </span>
            </div>

            <div className={styles.calcResultBottom}>
              <h3>החזר חודשי לפי מסלולים</h3>
              <div className={styles.CalcResultNum}>
                <span>פריים:</span>
                <span dir="ltr">
                  {result ? result.monthlySplit.prime.toLocaleString() : "-"} ₪
                </span>
              </div>
              <div className={styles.CalcResultNum}>
                <span>קבועה צמודה:</span>
                <span dir="ltr">
                  {result ? result.monthlySplit.fixed.toLocaleString() : "-"} ₪
                </span>
              </div>
              <div className={styles.CalcResultNum}>
                <span>משתנה לא צמודה:</span>
                <span dir="ltr">
                  {result ? result.monthlySplit.variable.toLocaleString() : "-"}{" "}
                  ₪
                </span>
              </div>
              <div className={styles.line} />

              <div className={styles.info}>
                <div className={styles.infoSon}>
                  <Download size={18} />
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      downloadPDF();
                    }}
                  >
                    שמור תוצאות כ-PDF
                  </a>
                </div>
                <div className={styles.infoSon}>
                  <Mail size={18} />
                  <a href="#">שלח לי את התוצאות</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.information}>
          <h2>מידע על משכנתאות</h2>
          {/* alert */}
          <div className={styles.alert}>
            <div className={styles.alertTitle}>
              <h3>חשוב לדעת:</h3>
              <OctagonAlert size={18} style={{ color: "red" }} />
            </div>
            <p>
              המחשבון נותן הערכה כללית בלבד. מומלץ להתייעץ עם יועץ משכנתאות
              מוסמך לפני קבלת החלטות.
            </p>
          </div>

          {/* type */}
          <div className={styles.infoB}>
            <div className={styles.drops}>
              <h1>סוגי מסלולי משכנתא</h1>
              <ul>
                <li>
                  פריים: ריבית המשתנה בהתאם לריבית בנק ישראל. בדרך כלל נמוכה
                  יותר, אך יכולה להשתנות לאורך תקופת ההלוואה.
                </li>
                <li>
                  קבועה צמודה: ריבית קבועה הצמודה למדד המחירים לצרכן. מספקת
                  יציבות בתשלומים, אך עשויה להיות גבוהה יותר בטווח הארוך.
                </li>
                <li>
                  משתנה לא צמודה: ריבית משתנה שאינה צמודה למדד. מתעדכנת בפרקי
                  זמן קבועים (בד"כ בין 1-5 שנים).
                </li>
              </ul>
            </div>

            <div className={styles.drops}>
              <h1>יתרונות משכנתא "מעורבבת"</h1>
              <ul>
                <li>פיזור סיכונים בין מסלולים שונים</li>
                <li>הקטנת החשיפה לשינויים בריבית ובמדד</li>
                <li>התאמה טובה יותר לצרכים האישיים וליכולת ההחזר</li>
                <li>אפשרות לבצע מחזור משכנתא על חלק מההלוואה בלבד</li>
              </ul>
            </div>

            <div className={styles.drops}>
              <h1>טיפים לבחירת משכנתא</h1>
              <ul>
                <li>
                  בדקו את יכולת ההחזר החודשית שלכם לטווח ארוך, לא רק בטווח
                  המיידי
                </li>
                <li>
                  שימו לב לעלויות הנלוות: עמלות פתיחת תיק, ביטוחים, שמאות ועוד
                </li>
                <li>
                  השוו הצעות ממספר בנקים - התחרות יכולה להוביל לתנאים טובים יותר
                </li>
                <li>
                  שיקלו לקחת יועץ משכנתאות - הידע המקצועי שלו יכול לחסוך לכם כסף
                  רב
                </li>
                <li>וודאו כי יש אפשרות לפירעון מוקדם ללא קנסות משמעותיים</li>
              </ul>
            </div>

            <div className={styles.drops}>
              <h1>מושגים חשובים</h1>
              <ul>
                <li>LTV (Loan to Value)</li>
                <li>
                  היחס בין סכום המשכנתא לשווי הנכס. משפיע על גובה הריבית
                  והתנאים.
                </li>
                <li>החזר-הכנסה</li>
                <li>
                  היחס בין ההחזר החודשי להכנסה החודשית. רצוי שלא יעלה על 30%.
                  גרייס
                </li>
                <li>תקופה בה משלמים ריבית בלבד, ללא החזר קרן. מחזור משכנתא</li>
                <li>החלפת משכנתא קיימת בהלוואה חדשה בתנאים טובים יותר.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
