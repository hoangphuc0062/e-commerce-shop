import { AuthProvider } from "./contexts/AuthContext";
import "./index.scss";
import RootRouter from "./routes";
function App() {
  return (
    <>
      <AuthProvider>
        <RootRouter />
      </AuthProvider>
    </>
  );
}

export default App;
