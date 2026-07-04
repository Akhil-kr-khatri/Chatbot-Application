import { useState } from "react";

import Sidebar from "./Components/Sidebar";
import ChatBox from "./Components/ChatBox";
import InputBox from "./Components/InputBox";

function App() {

  const [loading, setLoading] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: []
    }
  ]);

  const [activeChatId, setActiveChatId] =
    useState(1);

  // API URL
  const API_URL =
    "https://wwfl5icj62.execute-api.us-east-1.amazonaws.com/chat";

  // ACTIVE CHAT
  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // GENERATE TITLE
  const generateTitle = (text) => {

    return (
      text
        .replace(/\n/g, " ")
        .slice(0, 35) +
      (text.length > 35 ? "..." : "")
    );
  };

  // BUILD CONTEXT
  const buildMessages = (messages) => {

    return messages

      .filter(
        (msg) =>
          msg.text &&
          msg.text !== "Thinking..."
      )

      .map((msg) => ({

        role:
          msg.role === "user"
            ? "user"
            : "assistant",

        content: [
          {
            text: msg.text
          }
        ]
      }));
  };

  // SEND PROMPT
  const sendPrompt = async (prompt) => {

    if (!prompt.trim() || loading)
      return;

    const currentMessages =
      activeChat?.messages || [];

    const isFirstMessage =
      currentMessages.length === 0;

    // INSTANT UI UPDATE
    const updatedMessages = [

      ...currentMessages,

      {
        role: "user",
        text: prompt
      },

      {
        role: "assistant",
        text: "Thinking..."
      }
    ];

    // UPDATE CHAT
    setChats((prev) =>

      prev.map((chat) =>

        chat.id === activeChatId

          ? {
              ...chat,

              title:
                isFirstMessage
                  ? generateTitle(prompt)
                  : chat.title,

              messages:
                updatedMessages
            }

          : chat
      )
    );

    setLoading(true);

    try {

      // PAYLOAD
      const payload = {

        messages:
          buildMessages(
            updatedMessages.slice(-12)
          )
      };

      console.log(
        "FINAL PAYLOAD:",
        payload
      );

      console.log(
        "API URL:",
        API_URL
      );

      // API CALL
      const response = await fetch(

        API_URL,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            payload
          )
        }
      );

      // API ERROR
      if (!response.ok) {

        throw new Error(
          `API Error ${response.status}`
        );
      }

      const data =
        await response.json();

      console.log(
        "API RESPONSE:",
        data
      );

      // PARSE RESPONSE
      const parsed =
        data.body

          ? typeof data.body ===
            "string"

            ? JSON.parse(data.body)

            : data.body

          : data;

      const botResponse =
        parsed.response ||
        "No response generated";

      // UPDATE RESPONSE
      setChats((prev) =>

        prev.map((chat) => {

          if (
            chat.id !== activeChatId
          ) {
            return chat;
          }

          const newMessages = [
            ...chat.messages
          ];

          newMessages[
            newMessages.length - 1
          ] = {
            role: "assistant",
            text: botResponse
          };

          return {
            ...chat,
            messages: newMessages
          };
        })
      );

    } catch (error) {

      console.error(error);

      // ERROR UI
      setChats((prev) =>

        prev.map((chat) => {

          if (
            chat.id !== activeChatId
          ) {
            return chat;
          }

          const newMessages = [
            ...chat.messages
          ];

          newMessages[
            newMessages.length - 1
          ] = {
            role: "assistant",
            text:
              "Failed to fetch response"
          };

          return {
            ...chat,
            messages: newMessages
          };
        })
      );

    } finally {

      setLoading(false);
    }
  };

  // CREATE NEW CHAT
  const createNewChat = () => {

    const newChat = {

      id: Date.now(),

      title: "New Chat",

      messages: []
    };

    setChats((prev) => [
      ...prev,
      newChat
    ]);

    setActiveChatId(
      newChat.id
    );

    setSidebarOpen(false);
  };

  return (

    <div className="h-screen flex bg-[#020817] bg-[radial-gradient(circle_at_top,#172554_0%,#020817_45%)] text-white overflow-hidden">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 z-50 h-screen transition-all duration-300
          ${
            sidebarOpen
              ? "left-0"
              : "-left-full"
          }
          md:left-0
        `}
      >

        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          setActiveChatId={(id) => {

            setActiveChatId(id);

            setSidebarOpen(false);
          }}
          createNewChat={createNewChat}
        />

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* HEADER */}
        <div className="h-16 border-b border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shadow-lg shadow-black/20">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <button
              className="md:hidden w-10 h-10 rounded-xl hover:bg-white/10 transition-all"
              onClick={() =>
                setSidebarOpen(true)
              }
            >

              ☰

            </button>

            {/* TITLE */}
            <h1 className="text-sm md:text-lg font-semibold truncate">

              {activeChat?.title ||
                "AI Assistant"}

            </h1>

          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 text-green-400 text-xs md:text-sm bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">

            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            Online

          </div>

        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-2 md:px-6 py-6 scroll-smooth">

          {activeChat?.messages
            ?.length === 0 ? (

            <div className="h-full flex items-center justify-center px-6">

              <div className="text-center">

                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">

                  AI Assistant

                </h1>

                <p className="mt-6 text-gray-400 text-lg md:text-2xl max-w-xl leading-9">

                  Ask anything to start
                  the conversation.

                </p>

              </div>

            </div>

          ) : (

            <ChatBox
              messages={
                activeChat?.messages || []
              }
            />

          )}

        </div>

        {/* INPUT */}
        <div className="border-t border-white/10 bg-white/[0.03] backdrop-blur-xl">

          <InputBox
            onSend={sendPrompt}
            disabled={loading}
          />

        </div>

      </div>

    </div>
  );
}

export default App;