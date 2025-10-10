import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/main";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleDarkMode = (value) => {
    setIsDarkMode(value);
  };

  const toggleSidebar = (value) => {
    setIsSidebarOpen(value);
  };

  return (
    <div
      className={`flex min-h-screen font-outfit ${isDarkMode ? `dark` : null}`}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <Main toggleDarkMode={handleToggleDarkMode} sidebarOpen={toggleSidebar} />
    </div>
  );
}

export default App;
