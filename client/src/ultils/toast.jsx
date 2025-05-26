import { toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const handleToast = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const handleToastPromise = async (promise, messages) => {
  const response = await toast.promise(promise, {
    pending: messages.pending,
    success: messages.success,
    error: messages.error,
  });
  return response;
};
