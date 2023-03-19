/* eslint-disable no-undef */
import React from "react";
import { Menu } from "native-base";
import { useQueryClient } from "react-query";

export const ChatSave = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSaveAllChats = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setIsLoading(true);
      chrome.tabs.sendMessage(tabs[0].id, { action: "downloadAllChats" });
    });
    setTimeout(() => {
      queryClient.refetchQueries(["chats"]);
    }, 1000);
  };

  const onSaveChat = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "downloadChat" });
    });
    setTimeout(() => {
      queryClient.refetchQueries(["chats"]);
    }, 1000);
  };

  React.useEffect(() => {
    const handleMessage = (request, sender, sendResponse) => {
      if (request.action === "downloadAllChatsComplete") {
        setIsLoading(false);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <Menu>
      <Menu.Button
        px={3}
        size="xs"
        variant="link"
        isLoading={isLoading}
        colorScheme={"black"}
        onPress={onSaveAllChats}
        _spinner={{ color: "black" }}
      >
        Save Chats
      </Menu.Button>
      <Menu.List>
        <Menu.Item onPress={onSaveChat}>Save Open Chat</Menu.Item>
        <Menu.Item onPress={onSaveAllChats}>Save All Chats</Menu.Item>
      </Menu.List>
    </Menu>
  );
};
