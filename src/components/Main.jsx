import React, { useState } from "react";
import User from "../assets/sundar_pichai_google_ceo-1.jfif";
import IconGemini from "../assets/gemini.png";
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
import { getGeminiResponse } from "../config/apiConfig";

function Main() {
  const [responseText, setResponseText] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmit = async () => {
    setIsSubmited(true);
    setLoading(true);
    setSubmittedPrompt(inputText);
    const response = await getGeminiResponse(inputText);
    setResponseText(response);
    setInputText("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      handleSubmit();
    }
  };

  const formatResponse = (response) => {
    let formattedResponse = response
      .replace(
        /(\d+)\.\s([^\n]+)/g,
        (match, p1, p2) => `<p class="my-4"><strong>${p1}.</strong> ${p2}</p>`
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
      .replace(/\*([^\*]+)\*/g, "<em class='italic'>$1</em>")
      .replace(/\n/g, "<p class='my-4'>$&</p>");

    return formattedResponse;
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] max-h-screen overflow-y-auto relative">
      {/* Navbar */}
      <div className="flex items-center justify-between text-xl text-[#585858] p-5">
        <p>Gemini</p>
        <img src={User} alt="" className="rounded-full w-10" />
      </div>
      {/* Main Content */}
      <div className="max-w-4xl m-auto">
        {/* Heading */}
        {!isSubmited ? (
          <div className="text-6xl my-12 p-5 font-medium text-[#c4c7c5]">
            <p className="bg-linear-16 from-[#4b90ff]  to-[#ff5546] w-fit text-transparent bg-clip-text">
              Hello, Dev.
            </p>
            <p>How can I help you today?</p>
          </div>
        ) : null}

        {/* List Card */}
        {!isSubmited ? (
          <div className="grid gap-4 grid-cols-4 p-5">
            <CardMain
              textCard="Suggest beautiful places to see on an upcoming road trip"
              iconCard={
                <Compass
                  size={35}
                  className="ml-auto p-1 bg-white rounded-3xl"
                />
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
                  className="ml-auto p-1.5 bg-white rounded-xl"
                />
              }
            />
            <CardMain
              textCard="Improve the readability of the following code"
              iconCard={
                <CodeXml
                  size={35}
                  className="ml-auto p-1 bg-white rounded-3xl"
                />
              }
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-5 my-10">
              <img src={User} alt="" className="rounded-full w-10" />
              <p>{submittedPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img src={IconGemini} width={36} alt="" />
              {loading ? (
                <div className="w-full flex flex-col gap-2.5">
                  {/* Animasi Loading dengan Gradient */}
                  <div className="loading-gradient" />
                  <div className="loading-gradient" />
                  <div className="loading-gradient" />
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatResponse(responseText),
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* search bar */}
        <div className="fixed max-w-4xl w-full bottom-0 ">
          <div className="flex items-center justify-between py-2.5 px-5 bg-[#f0f4f9] rounded-4xl">
            <input
              type="text"
              name=""
              id=""
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
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
              <button className="cursor-pointer" onClick={handleSubmit}>
                <SendHorizontal size={24} />
              </button>
            </div>
          </div>
          {/* footer info */}
          <p className="text-sm py-4 font-light text-center bg-white">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and gemini apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
