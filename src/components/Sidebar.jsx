import {
  CircleQuestionMark,
  History,
  Menu,
  MessageSquare,
  Plus,
  Settings,
} from "lucide-react";
import React, { useState } from "react";

function Sidebar() {
  const [Extended, setExtended] = useState(false);

  return (
    <div
      className={`bg-[#f0f4f9] h-screen inline-flex flex-col justify-between py-6 px-3.5 transition-all duration-500 ease-out ${
        Extended ? `w-64` : `w-20`
      }`}
    >
      {/* Top */}
      <div>
        <Menu
          onClick={() => setExtended((prev) => !prev)}
          size={20}
          className="cursor-pointer ml-2.5"
        />
        <div className="inline-flex bg-[#e6e4f1] items-center gap-2.5 py-3 px-3.5 mt-12 rounded-4xl text-gray-700 cursor-pointer text-sm ">
          <Plus size={20} />
          {Extended ? <p>New Chat</p> : null}
        </div>
        {Extended ? (
          <div className="flex flex-col">
            <p className="mt-7 mb-5">Recent</p>
            <div className="flex self-start gap-2.5 pr-10 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
              <MessageSquare size={20} />
              <p>What is react...</p>
            </div>
          </div>
        ) : null}
      </div>
      {/* Bottom */}
      <div className="">
        <div className="flex self-start leading-0 gap-2.5 items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <CircleQuestionMark size={20} />
          {Extended ? <p>Help</p> : null}
        </div>
        <div className="flex self-start leading-0 gap-2.5 items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <History size={20} />
          {Extended ? <p>Activity</p> : null}
        </div>
        <div className="flex self-start leading-0 gap-2.5 items-center pr-2.5 p-2.5 rounded-4xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <Settings size={20} />
          {Extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
