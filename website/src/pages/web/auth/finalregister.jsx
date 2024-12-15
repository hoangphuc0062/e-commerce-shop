import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../ultils/toast";

export default function Finalregister() {
  const { token } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    if (token === "success") {
      handleToast("success", "Xác nhận tài khoản thành công");
      navigator("/login");
    } else {
      handleToast("error", "Xác nhận tài khoản thất bại");
    }
  }, [token, navigator]);
  return <></>;
}
