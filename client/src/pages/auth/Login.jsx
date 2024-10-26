import { Link } from "react-router-dom";
import { LoginForm } from "../../components/Form/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/customer";
import { handleToast } from "../../ultils/toast";

export const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(login(data)).then((res) => {
      if (res.type === "customer/login/fulfilled") {
        handleToast("success", "Đăng nhập thành công");
      } else {
        handleToast("error", "Đăng nhập thất bại");
      }
    });
  };
  return (
    <section className="mx-2">
      <div className="container flex justify-center">
        <div className="flex-1">
          <div>
            <h1>Logo here</h1>
            <h1 className="text-[32px] font-bold">Chào mừng bạn trở lại</h1>
          </div>
          <div>
            <span className="mr-1 text-gray-400">
              Bạn đã có tài khoản đăng nhập.
            </span>
            <span>
              <Link to={"/register"} className="text-main hover:underline">
                Đăng Ký
              </Link>
            </span>
          </div>
          <LoginForm onSubmit={handleSubmit} />
        </div>
        <div className="hidden lg:flex flex-1 justify-center ">
          <img
            src="https://res.cloudinary.com/dgthe0zuj/image/upload/v1725432318/illustration_atsn9q.png"
            alt="login-img"
          />
        </div>
      </div>
    </section>
  );
};
