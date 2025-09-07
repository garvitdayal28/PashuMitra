import { useState } from "react";
import PropTypes from "prop-types";

/**
 * A component for the PashuMitra AI chat assistant
 */
const ChatAssistant = ({ prediction }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your PashuMitra Assistant. How can I help you today? You can ask me about the predicted breed.",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);

    // Clear input
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      let response = "";

      if (prediction) {
        if (message.toLowerCase().includes("breed")) {
          response = `The identified breed is ${prediction.breed}, which is a native Indian cattle breed.`;
        } else if (
          message.toLowerCase().includes("characteristic") ||
          message.toLowerCase().includes("features")
        ) {
          response = `${prediction.breed} cattle are known for their distinctive features including a prominent hump, long ears, and typically have a reddish-brown coat with white patches.`;
        } else {
          response = `I can provide information about the ${prediction.breed} breed and its characteristics. What would you like to know?`;
        }
      } else {
        response =
          "Please upload an image first to get breed-specific information.";
      }

      setChatHistory([
        ...chatHistory,
        userMessage,
        { role: "assistant", content: response },
      ]);
    }, 1000);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">PashuMitra Assistant</h2>

      <div className="border rounded-lg p-4 mb-4 bg-gray-50 h-64 overflow-y-auto">
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
              className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                chat.role === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-100"
              }`}
            >
              <p>{chat.content}</p>
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
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
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
