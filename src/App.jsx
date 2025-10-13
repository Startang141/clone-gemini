import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/main";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("isDarkMode");
      if (saved !== null) return JSON.parse(saved);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [recentPrompts, setRecentPrompts] = useState(() => {
    try {
      const saved = localStorage.getItem("recentPrompts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("recentPrompts", JSON.stringify(recentPrompts));
  }, [recentPrompts]);

  const addRecent = (text) => {
    const t = text.trim();
    if (!t) return;
    setRecentPrompts((prev) => {
      const next = [t, ...prev.filter((p) => p !== t)].slice(0, 20);
      return next;
    });
  };

  const [selectedRecentPrompt, setSelectedRecentPrompt] = useState("");
  const handleSelectRecent = (text) => setSelectedRecentPrompt(text);

  const [newChatSignal, setNewChatSignal] = useState(0);
  const handleNewChat = () => setNewChatSignal((n) => n + 1);

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
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={toggleSidebar}
        recent={recentPrompts}
        onSelectRecent={handleSelectRecent}
        onNewChat={handleNewChat}
      />
      <Main
        toggleDarkMode={handleToggleDarkMode}
        sidebarOpen={toggleSidebar}
        onAddRecent={addRecent}
        triggerPrompt={selectedRecentPrompt}
        onPromptConsumed={() => setSelectedRecentPrompt("")}
        newChatSignal={newChatSignal}
      />
    </div>
  );
}

export default App;
