![Logo](public/icon128.png)

# Zima - ChatCPT Companion

A browser extension that allows users to save and search through their OpenAI chat transcripts.

## Features

- Save individual chat transcripts
- Save all chat transcripts
- Search through saved chat transcripts
- Filter chat transcripts based on similarity (ignores minor mistakes)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SoliMouse/zima
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Load the extension into your browser (Chrome, Edge, or any Chromium-based browser):

- Open the Extensions page (chrome://extensions)
- Enable "Developer mode"
- Click "Load unpacked" and select the `build` folder in the `chat-saver` directory

## Usage

1. Navigate to the OpenAI chat website (chat.openai.com).
2. Open the extension popup by clicking the icon in the browser toolbar.
3. Click "Save Chat" to save the current chat transcript.
4. Click "Save All Chats" to save all chat transcripts available on the website.
5. Enter a search query to filter chat transcripts based on similarity.

## Dependencies

- React
- React Query
- NativeBase
- Jaro-Winkler (for string similarity)

## How do we store the data?

- Each chat is stored as a JSON file with the chat ID as the file name.
- The JSON file has the following format:
  - `title`: The title of the chat
  - `id`: The unique identifier of the chat
  - `messages`: An array of dictionaries with `content` and `role`
    - `content`: The text of the message
    - `role`: Either `"user"` or `"assistant"`
- In local storage, chats are saved in a dictionary called `chats`, where the chat ID is used as the key and the chat object (with `title`, `id`, and `messages`) is the value.
