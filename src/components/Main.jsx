import React, { useEffect, useRef, useState } from "react";
import User from "../assets/sundar_pichai_google_ceo-1.jfif";
import IconGemini from "../assets/gemini.png";
import {
  CodeXml,
  Compass,
  ImagePlus,
  Lightbulb,
  Menu,
  MessageSquare,
  Mic,
  SendHorizontal,
} from "lucide-react";
import CardMain from "./CardMain";
import { getGeminiResponse } from "../config/apiConfig";

function Main({
  toggleDarkMode,
  sidebarOpen,
  onAddRecent,
  triggerPrompt,
  onPromptConsumed,
  newChatSignal,
}) {
  const [responseText, setResponseText] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const inputRef = useRef(null);

  const runPrompt = async (prompt) => {
    const p = (prompt ?? "").trim();
    if (!p || loading) return;

    setIsSubmited(true);
    setLoading(true);
    setSubmittedPrompt(p);
    onAddRecent?.(p);

    try {
      const response = await getGeminiResponse(p);
      setResponseText(response);
    } catch (error) {
      setResponseText(`Error: ${e.message}`);
    } finally {
      setInputText("");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await runPrompt(inputText);
  };

  useEffect(() => {
    if (triggerPrompt) {
      runPrompt(triggerPrompt);
      onPromptConsumed?.();
    }
  }, [triggerPrompt]);

  useEffect(() => {
    setResponseText("");
    setSubmittedPrompt("");
    setInputText("");
    setIsSubmited(false);
    setLoading(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [newChatSignal]);

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

  const handleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newState = !prev;
      toggleDarkMode(newState);
      return newState;
    });
  };

  const handleSidebarOpen = () => {
    sidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] max-h-screen overflow-y-auto relative bg-white dark:bg-[#1b1c1d]">
      {/* Navbar */}
      <div className="flex items-center justify-between text-xl text-[#585858] dark:text-slate-300 p-5">
        <div className="flex items-center gap-4">
          <Menu
            onClick={() => handleSidebarOpen()}
            size={20}
            className="cursor-pointer ml-2.5 dark:text-[#a2a9b0] md:hidden"
          />
          <p>Gemini</p>
        </div>
        <div className="flex items-center gap-8">
          {/* Toggle Dark */}
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={isDarkMode}
              onClick={() => handleDarkMode()}
              class="sr-only peer"
            />
            <div class="relative w-11 h-6 bg-[#f0f4f9] peer-fo;cus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#f0f4f9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600 transition-all ease-out"></div>
          </label>
          <img src={User} alt="" className="rounded-full w-10" />
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl m-auto">
        {/* Heading */}
        {!isSubmited ? (
          <div className="text-6xl my-12 p-5 font-medium text-[#c4c7c5] dark:text-neutral-600">
            <p className="bg-linear-16 from-[#4b90ff]  to-[#ff5546] w-fit text-transparent bg-clip-text">
              Hello, Dev.
            </p>
            <p>How can I help you today?</p>
          </div>
        ) : null}

        {/* List Card */}
        {!isSubmited ? (
          <div className="gap-4 grid-cols-4 p-5 hidden md:grid">
            <CardMain
              textCard="Suggest beautiful places to see on an upcoming road trip"
              iconCard={
                <Compass
                  size={35}
                  className="ml-auto p-1 bg-white rounded-3xl dark:text-white dark:bg-black"
                />
              }
            />
            <CardMain
              textCard="Briefly summarize this concept: urban planning"
              iconCard={
                <Lightbulb
                  size={35}
                  className="ml-auto p-1 bg-white rounded-3xl dark:text-white dark:bg-black"
                />
              }
            />
            <CardMain
              textCard="Brainstrom team bonding activities for our work retreat"
              iconCard={
                <MessageSquare
                  size={35}
                  className="ml-auto p-1.5 bg-white rounded-xl dark:text-white dark:bg-black"
                />
              }
            />
            <CardMain
              textCard="Improve the readability of the following code"
              iconCard={
                <CodeXml
                  size={35}
                  className="ml-auto p-1 bg-white rounded-3xl dark:text-white dark:bg-black"
                />
              }
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-5 my-10">
              <img src={User} alt="" className="rounded-full w-10" />
              <p className="text-black dark:text-slate-300">
                {submittedPrompt}
              </p>
            </div>
            <div className="flex items-start gap-5">
              <img src={IconGemini} width={36} alt="" />
              {loading ? (
                <div className="w-full flex flex-col gap-2.5">
                  {/* Animasi Loading dengan Gradient */}
                  <div className="loading-gradient dark:loading-gradient-dark" />
                  <div className="loading-gradient dark:loading-gradient-dark" />
                  <div className="loading-gradient dark:loading-gradient-dark" />
                </div>
              ) : (
                <div
                  className="text-black dark:text-slate-300"
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
          <div className="flex items-center justify-between py-2.5 px-5 bg-[#f0f4f9] rounded-4xl dark:border-[1px] dark:border-[#5c5f5e] dark:bg-[#1b1c1d] dark:text-[#a2a9b0]">
            <input
              type="text"
              name=""
              id=""
              value={inputText}
              ref={inputRef}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent outline-0 border-0 p-2 text-xl "
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
          <p className="text-sm py-4 font-light text-center bg-white dark:bg-[#1b1c1d] dark:text-[#a2a9b0]">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and gemini apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
