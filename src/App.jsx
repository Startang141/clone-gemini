import React from "react";
import Sidebar from "./components/sidebar";
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
