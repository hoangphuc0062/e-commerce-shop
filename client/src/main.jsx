import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store";
<<<<<<< HEAD
=======
import { AuthProvider } from "./context/AuthContext.jsx";
>>>>>>> parent of 59a1a95 (Merge pull request #369 from hoangphuc0062/dev)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <Provider store={store}>
        <ThemeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </Provider>
=======
      <AuthProvider>
        <Provider store={store}>
          <ThemeProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ThemeProvider>
        </Provider>
      </AuthProvider>
>>>>>>> parent of 59a1a95 (Merge pull request #369 from hoangphuc0062/dev)
    </BrowserRouter>
  </StrictMode>
);
