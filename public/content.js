/* eslint-disable no-undef */
const downloadChat = () => {
  // Get the chat ID from the URL
  const id = window.location.href.match(/\/chat\/([\w-]+)$/)[1];
  // Get the selected Chat title
  const title = document
    .querySelector("a.bg-gray-800 .flex-1.text-ellipsis")
    .textContent.trim();
  // Collect the chat messages
  const messages = Array.from(
    document.querySelectorAll(
      ".group div:first-child .flex-grow > div:first-child"
    )
  ).map((message, index) => ({
    role: index % 2 === 0 ? "user" : "assistant",
    content: message.textContent.trim(),
  }));
  console.debug(
    `Collected ${messages.length} messages from chat ${id} with title ${title}`
  );
  // Create the chat object
  const chat = { id, title, messages };
  // Save the chat in storage with the chat ID as the key
  chrome.storage.local.set({ [id]: chat }).then(function () {
    console.debug(`Saved chat ${id} to storage`);
  });
  // Download the chat file with the chat ID as the filename
  const blob = new Blob([JSON.stringify(chat, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.debug(`Download chat ${id} to device`);
};

const clickAndWait = (index, waitTime) => {
  const chats = document.querySelectorAll("nav > div > div > a");
  if (index >= chats.length) {
    // Check for the "Show more" button
    const showMoreButton = document.querySelector("button.btn-dark");

    // If the button exists, click it and wait before continuing
    if (showMoreButton) {
      showMoreButton.click();
      setTimeout(() => {
        clickAndWait(index, waitTime);
      }, waitTime);
    }

    return;
  }

  chats[index].click();
  downloadChat();

  setTimeout(() => {
    clickAndWait(index + 1, waitTime);
  }, waitTime);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadChat") {
    downloadChat();
  } else if (request.action === "downloadAllChats") {
    clickAndWait(0, 1000);
  }
});
