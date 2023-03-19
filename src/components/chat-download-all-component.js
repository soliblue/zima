/* eslint-disable no-undef */
import React from "react";
import { Button } from "native-base";
import { useQueryClient } from "react-query";

export const ChatDownloadAll = () => {
  const queryClient = useQueryClient();

  const onDownloadAllChats = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "downloadAllChats" });
    });
    setTimeout(() => {
      queryClient.refetchQueries(["chats"]);
    }, 1000);
  };

  return (
    <Button
      px={3}
      size="xs"
      variant="link"
      colorScheme={"black"}
      onPress={onDownloadAllChats}
    >
      Download All Chats
    </Button>
  );
};
