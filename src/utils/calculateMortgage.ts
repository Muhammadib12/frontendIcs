type MortgageInput = {
  firstValue: number;
  secValue: number;
  months: number;
  annualRate: number;
  prime: number;
  fixed: number;
  variable: number;
};

type MortgageResults = {
  loanAmount: number;
  monthly: number;
  totalInterest: number;
  totalPayment: number;
  monthlySplit: {
    prime: number;
    fixed: number;
    variable: number;
  };
};

const calculateMortgage = ({
  firstValue,
  secValue,
  months,
  annualRate,
  prime,
  fixed,
  variable,
}: MortgageInput): MortgageResults => {
  const loanAmount = firstValue - secValue;
  const monthlyRate = annualRate / 100 / 12;

  const monthly =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = monthly * months;
  const totalInterest = totalPayment - loanAmount;

  const monthlySplit = {
    prime: Math.round((monthly * prime) / 100),
    fixed: Math.round((monthly * fixed) / 100),
    variable: Math.round((monthly * variable) / 100),
  };

  return {
    loanAmount: Math.round(loanAmount),
    monthly: Math.round(monthly),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    monthlySplit,
  };
};

export default calculateMortgage;
