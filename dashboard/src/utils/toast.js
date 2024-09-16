import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleToast = (type, message, position) => {
  toast[type](message, {
    position: position,
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
