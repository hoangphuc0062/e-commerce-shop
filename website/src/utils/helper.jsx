export const formatDay = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const convertToISODateString = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getDisplayName = (name) => {
  if (!name) {
    return "";
  }
  const nameParts = name.split(" ");
  return nameParts.slice(-2).join(" ");
};

export const splitValues = (valuesString) => {
  return valuesString.split(", ").map((value) => value.trim());
};
