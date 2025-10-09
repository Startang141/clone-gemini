import React from "react";

function CardMain({ textCard, iconCard }) {
  return (
    <div className="h-52 p-4 bg-[#f0f4f9] rounded-xl relative cursor-pointer flex flex-col justify-between  hover:bg-[#dfe4ea] dark:bg-[#282a2c] dark:hover:bg-[#39393f]">
      <p className="text-md text-black dark:text-slate-300">{textCard}</p>
      {iconCard}
    </div>
  );
}

export default CardMain;
