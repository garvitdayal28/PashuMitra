

## How It Works

The ChatAssistant component uses the Gemini API to generate responses based on user queries. When a breed is identified in an image, the AI will use that information as context to provide more accurate responses about the specific breed.

## Features

- Real-time AI-powered responses
- Breed-specific information when an image is analyzed
- Loading indicators during API calls
- Chat history preservation within the session

## Customization

You can modify the behavior of the Gemini integration by editing:

- `src/hooks/useGeminiChat.jsx` - Core API interaction logic
- `src/components/shared/ChatAssistant.jsx` - Chat UI and user interaction
