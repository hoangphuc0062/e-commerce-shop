import { vnPay } from "../redux/slices/order";

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

export const translate = (key) => {
  const translations = {
    cash: "Tiền mặt",
    Processing: "Đang xử lý",
    Success: "Thành công",
    vnpay: "VNPay",
  };

  return translations[key] || key;
};

export const transformAttributes = (attributes) => {
  return Object.entries(attributes).map(([title, details]) => {
    const detailArray = details.split(", ").map((item) => {
      const [key, ...valueParts] = item.split(": ");
      return { key: key.trim(), value: valueParts.join(": ").trim() };
    });
    return { title, details: detailArray };
  });
};

export const objectToQueryString = (filters) => {
  const queryParams = []; // Mảng dùng để lưu trữ các phần của query string

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      // Nếu giá trị là một mảng, nối các phần tử bằng dấu phẩy, loại bỏ khoảng trắng trong từng phần tử
      queryParams.push(
        `${key}=${value.map((val) => val.replace(/\s+/g, "-")).join(",")}`
      );
    } else if (typeof value === "object") {
      // Nếu giá trị là một object (như 'price'), xử lý nó thành chuỗi "minPrice-maxPrice"
      const priceRange = `${value.minPrice}-${value.maxPrice}`;
      queryParams.push(`${key}=${priceRange}`);
    }
  }

  return queryParams.join("&"); // Kết nối các phần tử của query string bằng dấu "&"
};
