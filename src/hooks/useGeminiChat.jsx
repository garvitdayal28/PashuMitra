import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Custom hook for integrating with Google Gemini API
 * @returns {Object} Hook functionality
 */
export function useGeminiChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get a response from Gemini API
   * @param {string} prompt - The prompt to send to Gemini
   * @param {object} breedInfo - Optional breed information for context
   * @returns {Promise<string>} The response from Gemini
   */
  const getGeminiResponse = async (prompt, breedInfo = null) => {
    setIsLoading(true);
    setError(null);

    try {
      // Initialize the Gemini API client with the API key from environment variables
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

      // Use gemini-1.5-flash model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create the full prompt with breed information if available
      let fullPrompt = prompt;

      if (breedInfo) {
        fullPrompt = `
          Context: The user has uploaded an image of a cattle/buffalo that has been identified as:
          - Breed: ${breedInfo.breed}
          - Scientific Name: ${breedInfo.scientificName}
          - Confidence: ${breedInfo.confidence}%
          - Status: ${breedInfo.status}
          
          Please provide helpful information about this breed in response to this query: ${prompt}
          
          Format your response with the following guidelines:
          1. Keep your answer concise and well-structured 
          2. Use **bold text** for important terms or headings
          3. Use bullet points (*) for lists where appropriate
          4. Organize information into clear sections
          5. Maximum length: 250-300 words
        `;
      }

      // Get the response from Gemini
      const result = await model.generateContent(fullPrompt);

      // Return the text response
      return result.response.text();
    } catch (err) {
      setError(err.message || "Failed to get response from AI");
      return "I'm having trouble connecting to the AI service right now. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getGeminiResponse,
  };
}
