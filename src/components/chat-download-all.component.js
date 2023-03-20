import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { IconButton } from "native-base";
import { Download } from "react-ionicons";

export const ChatDownloadAll = ({ chats }) => {
  const downloadAllChats = async () => {
    const zip = new JSZip();

    // Add all chat files to the zip
    for (const chatId in chats) {
      const chat = chats[chatId];
      const content = JSON.stringify(chat, null, 2);
      zip.file(`${chat.id}.json`, content);
    }

    // Generate the zip file and save it
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "chats.zip");
    console.debug("Downloaded all chats to device");
  };

  return (
    <IconButton
      p={0}
      variant="unstyled"
      onPress={downloadAllChats}
      icon={<Download height={"15px"} width={"15px"} />}
    />
  );
};
