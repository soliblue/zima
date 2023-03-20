/* eslint-disable no-undef */
import React from "react";
import { Button, Menu, Text, VStack } from "native-base";
import { useQueryClient } from "react-query";
import { Sync } from "react-ionicons";

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
    <Menu
      trigger={(triggerProps) => (
        <VStack>
          <Button
            _text={{ color: "darkText" }}
            {...triggerProps}
            isLoading={isLoading}
            _spinner={{ color: "darkText" }}
            rightIcon={
              <Sync
                height="15px"
                width="15px"
                color="darkText"
                fill="darkText"
              />
            }
          >
            Sync Chats
          </Button>
        </VStack>
      )}
    >
      <Menu.Item onPress={onSaveChat}>Open Chat</Menu.Item>
      <Menu.Item onPress={onSaveAllChats}>All Chats</Menu.Item>
    </Menu>
  );
};
