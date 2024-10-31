const messageConverter = (message) => {
  const translations = {
    "Phone number already exists": "Số điện thoại đã được đăng ký",
    // Add more translations as needed
  };

  return translations[message] || message;
};

export default messageConverter;
