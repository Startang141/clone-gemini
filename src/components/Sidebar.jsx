import {
  CircleQuestionMark,
  History,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function Sidebar({ isSidebarOpen, closeSidebar }) {
  const [Extended, setExtended] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setExtended(true);
    }
  }, [isSidebarOpen]);

  const handleCloseSidebar = () => {
    closeSidebar(false);
  };

  return (
    <div
      className={`bg-[#f0f4f9] h-screen flex-col inline-flex absolute z-50 md:left-0 md:relative justify-between py-6 px-3.5 transition-all duration-500 ease-out dark:bg-[#282a2c]  ${
        Extended ? `w-64` : `w-20`
      } ${isSidebarOpen ? `left-0` : `-left-80`}`}
    >
      {/* Top */}
      <div>
        <Menu
          onClick={() => setExtended((prev) => !prev)}
          size={20}
          className="cursor-pointer ml-2.5 dark:text-[#a2a9b0] hidden md:block"
        />
        <X
          onClick={handleCloseSidebar}
          className="cursor-pointer ml-2.5 dark:text-[#a2a9b0]  md:hidden"
        />
        <div className="inline-flex bg-[#e6e4f1] items-center gap-2.5 py-3 px-3.5 mt-12 rounded-4xl text-gray-700 cursor-pointer text-sm dark:bg-[#a2a9b014] dark:hover:bg-[#a2a9b059] dark:text-[#a2a9b0]">
          <Plus size={20} />
          {Extended ? <p>New Chat</p> : null}
        </div>
        {Extended ? (
          <div className="flex flex-col">
            <p className="mt-7 mb-5 dark:text-[#a2a9b0]">Recent</p>
            <div className="flex self-start gap-2.5 pr-10 py-2.5 px-4 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb] dark:text-[#a2a9b0] dark:hover:bg-[#a2a9b014]">
              <MessageSquare size={20} />
              <p>What is react...</p>
            </div>
          </div>
        ) : null}
      </div>
      {/* Bottom */}
      <div className="">
        <div className="flex self-start leading-0 gap-2.5 dark:text-[#a2a9b0] items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb] dark:hover:bg-[#a2a9b014]">
          <CircleQuestionMark size={20} />
          {Extended ? <p>Help</p> : null}
        </div>
        <div className="flex self-start leading-0 gap-2.5 dark:text-[#a2a9b0] items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb] dark:hover:bg-[#a2a9b014]">
          <History size={20} />
          {Extended ? <p>Activity</p> : null}
        </div>
        <div className="flex self-start leading-0 gap-2.5 dark:text-[#a2a9b0] items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb] dark:hover:bg-[#a2a9b014]">
          <Settings size={20} />
          {Extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
