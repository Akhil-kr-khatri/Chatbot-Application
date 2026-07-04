function Sidebar({

  chats,

  activeChatId,

  setActiveChatId,

  createNewChat

}) {

  return (

    <div className="w-72 h-screen bg-[#111827] border-r border-white/10 flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10">

        <button
          onClick={createNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-medium"
        >

          + New Chat

        </button>

      </div>

      {/* CHATS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        {chats.map((chat) => (

          <button
            key={chat.id}
            onClick={() =>
              setActiveChatId(chat.id)
            }
            className={`w-full text-left px-4 py-3 rounded-xl transition truncate ${activeChatId === chat.id ? "bg-blue-600 text-white" : "bg-[#1f2937] hover:bg-[#374151]"}`}
          >

            {chat.title}

          </button>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;