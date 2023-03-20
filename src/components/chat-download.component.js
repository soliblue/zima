import { IconButton } from "native-base";
import React from "react";
import { Download } from "react-ionicons";

export const ChatDownload = ({ chat }) => {
  const downloadChat = () => {
    const blob = new Blob([JSON.stringify(chat, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chat?.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    console.debug(`Download chat ${chat?.id} to device`);
  };

  return (
    <IconButton
      p={0}
      variant="unstyled"
      onPress={downloadChat}
      icon={<Download height={"15px"} width={"15px"} />}
    />
  );
};
