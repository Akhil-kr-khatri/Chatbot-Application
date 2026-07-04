import { useState } from "react";

function InputBox({ onSend, disabled }) {

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();
    }
  };

  return (

    <div className="border-t border-white/10 bg-[#0f172a] p-4">

      <div className="flex items-end gap-3 max-w-5xl mx-auto">

        <textarea
          rows={1}
          value={input}
          disabled={disabled}
          placeholder="Ask anything..."
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none rounded-2xl bg-[#1e293b] text-white px-4 py-3 outline-none border border-white/10 focus:border-blue-500 text-[15px]"
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
        >

          Send

        </button>

      </div>

    </div>
  );
}

export default InputBox;