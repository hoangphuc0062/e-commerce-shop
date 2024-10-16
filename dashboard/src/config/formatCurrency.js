const formatCurrency = (
  value,
  currency = "USD",
  locale = "en-US",
  fractionDigits = 2
) => {
  // Ensure the value is a valid number
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    console.error("Invalid number input");
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(numericValue);
};

export default formatCurrency;
