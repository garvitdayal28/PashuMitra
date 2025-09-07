import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGeminiChat } from "../../hooks/useGeminiChat";

/**
 * A component for the PashuMitra AI chat assistant powered by Google Gemini
 */
const ChatAssistant = ({ prediction }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your PashuMitra Assistant. How can I help you today? You can ask me about cattle and buffalo breeds.",
    },
  ]);
  const { isLoading, getGeminiResponse } = useGeminiChat();
  const chatContainerRef = useRef(null);

  // Scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);

    // Store the message and clear input
    const userQuery = message;
    setMessage("");

    // Add loading indicator
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: "...", isLoading: true },
    ]);

    try {
      // Get AI response using Gemini
      const response = await getGeminiResponse(userQuery, prediction);

      // Replace loading message with actual response
      setChatHistory((prev) =>
        prev.slice(0, -1).concat({
          role: "assistant",
          content: response,
        })
      );
    } catch (error) {
      // Handle error
      console.error("Error getting response from Gemini:", error);
      setChatHistory((prev) =>
        prev.slice(0, -1).concat({
          role: "assistant",
          content:
            "I'm having trouble connecting to the AI service right now. Please try again later.",
        })
      );
    }
  };

  // Helper function to format AI response with markdown-like styling
  const formatAIResponse = (text) => {
    // If content is short or is loading, return as is
    if (text === "..." || text.length < 100) return text;

    // Format headers with bold
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
      .replace(/^(.*?):$/gm, '<span class="font-bold text-blue-700">$1:</span>')
      // Create bullet points for lists
      .replace(/\* (.*?)$/gm, '<li class="ml-5 list-disc">$1</li>')
      // Add paragraph spacing
      .replace(/\n\n/g, '</p><p class="mt-2">');

    return `<p class="prose">${formatted}</p>`;
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">PashuMitra AI Assistant</h2>
      </div>

      <div
        className="border rounded-lg p-4 mb-4 bg-gray-50 h-96 overflow-y-auto"
        ref={chatContainerRef}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              chat.role === "user" ? "justify-end" : ""
            }`}
          >
            {chat.role === "assistant" && (
              <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div
              className={`p-4 rounded-lg ${
                chat.role === "user"
                  ? "bg-blue-500 text-white ml-auto max-w-xs"
                  : "bg-gray-100 max-w-3xl"
              } ${chat.isLoading ? "animate-pulse" : ""}`}
            >
              {chat.role === "assistant" ? (
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatAIResponse(chat.content),
                  }}
                />
              ) : (
                <p>{chat.content}</p>
              )}
            </div>
            {chat.role === "user" && (
              <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center ml-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`${
            isLoading || !message.trim()
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 rounded-r-lg transition duration-200`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

ChatAssistant.propTypes = {
  prediction: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    scientificName: PropTypes.string.isRequired,
    relatedBreed: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default ChatAssistant;
