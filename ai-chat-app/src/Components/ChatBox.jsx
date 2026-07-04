import { useEffect, useRef } from "react";

import Message from "./Message";

function ChatBox({ messages }) {

  const bottomRef = useRef(null);

  // ✅ Auto Scroll
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (

    <div className="flex flex-col gap-5 px-4 md:px-8 py-6 overflow-y-auto">

      {messages.map((msg, index) => (

        <Message
          key={index}
          role={msg.role}
          text={msg.text}
        />

      ))}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default ChatBox;