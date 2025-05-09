import styles from "./../styles/Calculator.module.css";
import html2pdf from "html2pdf.js";

const downloadPDF = () => {
  const resultElement = document.querySelector(`.${styles.calcResult}`);
  if (!resultElement) return;

  // أخفي الأزرار قبل التصدير
  const buttons = resultElement.querySelector(`.${styles.info}`);
  if (buttons) buttons.setAttribute("style", "display: none");

  const originalBackground = resultElement.getAttribute("style") || "";
  // resultElement.setAttribute(
  //   "style",
  //   `${originalBackground}; background: linear-gradient(to bottom right, #f0f4ff, #ddeeff); padding: 20px; border-radius: 10px;`
  // );

  const opt = {
    margin: 0.5,
    filename: "Mortgage_Result.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(resultElement)
    .save()
    .then(() => {
      // أعد عرض الأزرار بعد التصدير
      if (buttons) buttons.setAttribute("style", "display: flex");
      resultElement.setAttribute("style", originalBackground);
    });
};

export default downloadPDF;
