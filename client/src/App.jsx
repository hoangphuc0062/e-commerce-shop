import RootRouter from "./routes/Route";
import "./index.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer />
    </>
  );
}

export default App;
