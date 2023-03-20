import React from "react";
import { Link } from "react-ionicons";
import { Text, Box, HStack, Tooltip, IconButton } from "native-base";
import { ChatDownload } from "./chat-download.component";

export const Chat = ({ chat }) => {
  return (
    <Box m={1}>
      <HStack alignItems={"center"} space={1} justifyContent="space-between">
        <Text noOfLines={1} fontSize="xs">
          {chat?.title}
        </Text>
        <HStack space={2} alignItems="center">
          <Tooltip label="Click here to download the chat as JSON">
            <ChatDownload chat={chat} />
          </Tooltip>
          <IconButton
            p={0}
            icon={<Link height={"15px"} width={"15px"} />}
            onPress={() => {
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
