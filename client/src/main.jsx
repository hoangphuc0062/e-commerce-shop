import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
