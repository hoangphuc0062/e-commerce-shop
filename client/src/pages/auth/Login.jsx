import { Link } from "react-router-dom";
import { LoginForm } from "../../components/Form/LoginForm";

export const Login = () => {
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
          <LoginForm />
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
