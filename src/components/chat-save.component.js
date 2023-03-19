/* eslint-disable no-undef */
import React from "react";
import { Button } from "native-base";
import { useQueryClient } from "react-query";

export const ChatDownload = () => {
  const queryClient = useQueryClient();

  const onDownloadChat = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "downloadChat" });
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
      onPress={onDownloadChat}
    >
      Download Chat
    </Button>
  );
};
