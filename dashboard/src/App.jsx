import { ToastContainer } from "react-toastify";
import "./index.scss";
import RootRouter from "./routes";
import { UserProvider } from "./contexts/AuthContext";
function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer stacked />
        <RootRouter />
      </UserProvider>
    </>
  );
}

export default App;
