import React from "react";
import { Link } from "react-ionicons";
import { Text, Box, HStack } from "native-base";
import { ChatDownload } from "./chat-download.component";

export const Chat = ({ chat }) => {
  return (
    <Box m={1}>
      <HStack alignItems={"center"} space={1} justifyContent="space-between">
        <Text noOfLines={1} fontSize="xs">
          {chat?.title}
        </Text>
        <HStack space={2} alignItems="center">
          <ChatDownload chat={chat} />
          <Link
            height={"15px"}
            width={"15px"}
            onClick={() => {
              // eslint-disable-next-line no-undef
              chrome.tabs.create({
                url: `https://chat.openai.com/chat/${chat?.id}`,
              });
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
