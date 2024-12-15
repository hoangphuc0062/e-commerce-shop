import { FaRegStar, FaStar } from "react-icons/fa";

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

export const renderStarFromNumber = (number, size) => {
  const stars = [];
  number = Math.round(number);
  const color = Number.isFinite(number) && number > 0 ? "#FFD700" : "#000000";
  const filledStars = Math.floor(number) || 0;  

  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar color={color} size={size || 16} key={`filled-${i}`} />);
  }
  for (let i = filledStars; i < 5; i++) {
    stars.push(
      <FaRegStar color={color} size={size || 16} key={`empty-${i}`} />
    );
  }

  return stars;
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

export const updateSelectedFiltersWithKeys = (filters, selectedFilters) => {
  const updatedFilters = {};

  Object.entries(selectedFilters).forEach(([label, value]) => {
    const filterMatch = filters.find((filter) => filter.label === label);

    if (filterMatch) {
      // Nếu tìm thấy filter có label khớp, lấy key từ filter và thêm vào kết quả
      updatedFilters[filterMatch.key] = value;
    }
  });

  return updatedFilters;
};
