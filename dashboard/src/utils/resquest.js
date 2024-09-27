import axios from "axios";

const baseURL = import.meta.env.VITE_API_ROOT;

const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor để thêm access token vào Authorization header
request.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Function để làm mới token (refresh token)
const refreshToken = async () => {
  try {
    const response = await request.post("/refresh-token"); // Đảm bảo endpoint này trả về accessToken mới
    const { accessToken } = response.data;

    // Lưu accessToken vào localStorage hoặc nơi khác nếu cần
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing token", error);
    // Xử lý trường hợp làm mới token không thành công (ví dụ: logout người dùng)
    throw error;
  }
};

// Interceptor để xử lý khi access token hết hạn
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn (401 Unauthorized), thử làm mới token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request này để tránh lặp vô tận

      const newAccessToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Thử gửi lại request với token mới
      return request(originalRequest);
    }

    // Nếu lỗi khác 401, trả về lỗi ban đầu
    return Promise.reject(error);
  }
);

// Hàm gửi request với method động

const sendRequest = async (method, path, options = {}) => {
  const response = await request[method](path, options);
  return response.data;
};
export default sendRequest;
