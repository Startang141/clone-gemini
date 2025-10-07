import React from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/main";

function App() {
  return (
    <div className="flex min-h-screen font-outfit">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
