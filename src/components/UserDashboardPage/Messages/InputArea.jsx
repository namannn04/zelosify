import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function InputArea() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log(message);
      setMessage("");
      resetTextareaHeight();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      resetTextareaHeight();
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    //Handling Shift + Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t px-4 pt-4 text-sm">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Send a message"
          rows={1}
          className="border w-full px-12 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none overflow-y-auto custom-scrollbar min-h-[50px] max-h-[200px]"
        />

        <div className="absolute right-3 flex items-center">
          <div className="group relative">
            <button
              onClick={sendMessage}
              className="p-1 hover:bg-gray-800 rounded-full bg-black flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <span className="w-[105px] absolute -top-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
              Send Message
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-1 text-xs text-gray-400 text-center">
        Model may generate inaccurate information about people, places, or
        facts.
      </div>
    </div>
  );
}
