/* eslint-disable no-undef */
import React from "react";
import { Divider, FlatList, HStack, Spinner, Text, VStack } from "native-base";
// internal
import { useChats } from "../hooks/useChats";
import { ChatSave } from "./chat-save-component";
import { Chat } from "../components/chat.component";
import { ChatDownloadAll } from "./chat-download-all.component";

export const ChatList = ({ search }) => {
  const chats = useChats(search);

  return (
    <>
      {chats?.isLoading ? (
        <HStack alignItems={"center"} space={1}>
          <Spinner />
          <Text>Loading chats...</Text>
        </HStack>
      ) : (
        <VStack space={3}>
          <HStack
            space={1}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <HStack space={1} alignItems={"center"}>
              <ChatDownloadAll chats={chats?.data} />
              <Text
                p={1}
                px={2}
                bg="gray.200"
                fontSize={"xs"}
                borderRadius="md"
              >
                {Object.keys(chats?.data)?.length || 0}
              </Text>
              <Text fontSize={"xs"}>Chats...</Text>
            </HStack>
            <ChatSave chatsLength={Object.keys(chats?.data)?.length || 0} />
          </HStack>
          <Divider />

          <FlatList
            data={Object.keys(chats?.data)}
            renderItem={({ item: chatId }) => (
              <Chat chat={chats?.data[chatId]} />
            )}
          />
        </VStack>
      )}
    </>
  );
};
