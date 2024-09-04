import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../../theme/ThemeProvider";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

function DashboardLayout() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const layoutClasses = `flex h-screen ${isDarkMode ? "dark bg-gray-800" : "bg-background"}`;

  return (
    <div className={layoutClasses}>
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header toggleDarkMode={toggleDarkMode} darkMode={isDarkMode} />

        <main className={`flex-grow p-10 ${isDarkMode ? 'dark:bg-gray-800' : 'bg-background'}`}>
      <Breadcrumbs /> 

          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
