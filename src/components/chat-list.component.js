/* eslint-disable no-undef */
import React from "react";
import { Divider, FlatList, HStack, Text, VStack } from "native-base";
// internal
import { ChatSave } from "./chat-save-component";
import { Chat } from "../components/chat.component";
import { ChatDownloadAll } from "./chat-download-all.component";

export const ChatList = ({ chats }) => {
  const chatIds = Object.keys(chats);
  return (
    <VStack space={3}>
      <HStack space={1} alignItems="center" justifyContent={"space-between"}>
        <HStack space={1} alignItems={"center"}>
          <ChatDownloadAll chats={chats} />
          <Text p={1} px={2} bg="gray.200" fontSize={"xs"} borderRadius="md">
            {chatIds?.length || 0}
          </Text>
          <Text fontSize={"xs"}>Chats...</Text>
        </HStack>
        <ChatSave chatsLength={chatIds?.length || 0} />
      </HStack>
      <Divider />

      <FlatList
        data={chatIds}
        renderItem={({ item: chatId }) => <Chat chat={chats[chatId]} />}
      />
    </VStack>
  );
};
