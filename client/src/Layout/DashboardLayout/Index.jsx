import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Header from "./Header";

function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Centralize className logic
  const layoutClasses = `flex h-screen ${darkMode ? "dark bg-gray-800" : "bg-background"}`;

  return (
    <div className={layoutClasses}>
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="flex-grow p-10 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
