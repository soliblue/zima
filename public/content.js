/* eslint-disable no-undef */
const downloadChat = async () => {
  return new Promise(async (resolve) => {
    // Get the chat ID from the URL
    const id = window.location.href.match(/\/chat\/([\w-]+)$/)[1];

    // Get the selected Chat title
    const titleElement = await waitForElement(
      "a.bg-gray-800 .flex-1.text-ellipsis"
    );
    const title = titleElement.textContent.trim();

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
    chrome.storage.local.set({ [id]: chat }, () => {
      console.debug(`Saved chat ${id} to storage`);
      resolve();
    });
  });
};

const waitForUrlChange = (currentUrl) => {
  return new Promise((resolve) => {
    const checkUrlChange = () => {
      if (
        window.location.href !== currentUrl &&
        window.location.href.includes("https://chat.openai.com/chat/")
      ) {
        resolve();
      } else {
        setTimeout(checkUrlChange, 100);
      }
    };
    checkUrlChange();
  });
};

const waitForElement = (selector) => {
  return new Promise((resolve) => {
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        setTimeout(checkElement, 100);
      }
    };
    checkElement();
  });
};

const clickAndWait = async (index) => {
  const chats = document.querySelectorAll("nav > div > div > a");
  if (index >= chats.length) {
    // Check for the "Show more" button
    const showMoreButton = document.querySelector("button.btn-dark");

    // If the button exists, click it and wait before continuing
    if (showMoreButton) {
      showMoreButton.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await clickAndWait(index);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    return;
  }

  const currentUrl = window.location.href;
  chats[index].click();
  await waitForUrlChange(currentUrl);
  await downloadChat();
  await clickAndWait(index + 1);
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "downloadChat") {
    await downloadChat();
  } else if (request.action === "downloadAllChats") {
    await clickAndWait(0);
  }
});
