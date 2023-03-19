/* eslint-disable no-undef */
const downloadChat = () => {
  // Get the chat ID from the URL
  const chatId = window.location.href.match(/\/chat\/([\w-]+)$/)[1];

  const selectedAnchor = document.querySelector("a.bg-gray-800");
  const chatTitle = selectedAnchor
    .querySelector(".flex-1.text-ellipsis")
    .textContent.trim();

  // Collect the messages
  const messages = document.querySelectorAll(
    ".group div:first-child .flex-grow > div:first-child"
  );
  const chat = [];

  messages.forEach((message, key) => {
    const role = key % 2 === 0 ? "user" : "assistant";
    const content = message.textContent.trim();
    chat.push({ role, content });
  });

  console.debug(`Collected ${chat.length} messages from chat ${chatId}`);

  // Download the chat file with the chat ID as the filename
  const blob = new Blob([JSON.stringify(chat, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${chatId}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.debug(`Download chat ${chatId} to device`);

  // Save the download JSON in storage
  chrome.storage.local
    .set({ [chatId]: { id: chatId, messages: chat, title: chatTitle } })
    .then(function () {
      console.debug(`Saved chat ${chatId} to storage`);
    });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadChat") {
    downloadChat();
  }
});
