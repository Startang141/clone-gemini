import React from "react";
import User from "../assets/sundar_pichai_google_ceo-1.jfif";
import {
  CodeXml,
  Compass,
  ImagePlus,
  Lightbulb,
  MessageSquare,
  Mic,
  SendHorizontal,
} from "lucide-react";
import CardMain from "./CardMain";

function Main() {
  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* Navbar */}
      <div className="flex items-center justify-between text-xl text-[#585858] p-5">
        <p>Gemini</p>
        <img src={User} alt="" className="rounded-full w-10" />
      </div>
      {/* Main Content */}
      <div className="max-w-4xl m-auto">
        {/* Heading */}
        <div className="text-6xl my-12 p-5 font-medium text-[#c4c7c5]">
          <p className="bg-linear-to-br from-[#4b90ff] to-[#ff5546] text-transparent bg-clip-text">
            Hello, Dev.
          </p>
          <p>How can I help you today?</p>
        </div>
        {/* List Card */}
        <div className="grid gap-4 grid-cols-4 p-5">
          <CardMain
            textCard="Suggest beautiful places to see on an upcoming road trip"
            iconCard={
              <Compass size={35} className="ml-auto p-1 bg-white rounded-3xl" />
            }
          />
          <CardMain
            textCard="Briefly summarize this concept: urban planning"
            iconCard={
              <Lightbulb
                size={35}
                className="ml-auto p-1 bg-white rounded-3xl"
              />
            }
          />
          <CardMain
            textCard="Brainstrom team bonding activities for our work retreat"
            iconCard={
              <MessageSquare
                size={35}
                className="ml-auto p-1 bg-white rounded-3xl"
              />
            }
          />
          <CardMain
            textCard="Improve the readability of the following code"
            iconCard={
              <CodeXml size={35} className="ml-auto p-1 bg-white rounded-3xl" />
            }
          />
        </div>
        {/* search bar */}
        <div className="absolute max-w-4xl w-full py-5 bottom-0">
          <div className="flex items-center justify-between py-2.5 px-5 bg-[#f0f4f9] rounded-4xl">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent outline-0 border-0 p-2 text-xl"
            />
            <div className="flex items-center gap-4">
              <button className="cursor-pointer">
                <ImagePlus size={24} />
              </button>
              <button className="cursor-pointer">
                <Mic size={24} />
              </button>
              <button className="cursor-pointer">
                <SendHorizontal size={24} />
              </button>
            </div>
          </div>
          {/* footer info */}
          <p className="text-sm py-4 font-light text-center">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and gemini apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
