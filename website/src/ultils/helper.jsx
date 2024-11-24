export const formatDay = (isoDateString, format = "DD-MM-YYYY") => {
  if (!isoDateString || isNaN(Date.parse(isoDateString))) {
    console.warn("Invalid ISO date string:", isoDateString);
    return "Invalid Date";
  }

  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
};


export const convertToISODateString = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return null; // Hoặc giá trị mặc định nào đó
  }

  const [day, month, year] = dateString.split("-").map(Number);

  if (!day || !month || !year) {
    console.error("Invalid date components:", { day, month, year });
    return null; // Hoặc giá trị mặc định nào đó
  }

  const date = new Date(year, month - 1, day);
  return date.toISOString();
};


export const formatCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
