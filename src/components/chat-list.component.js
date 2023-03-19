/* eslint-disable no-undef */
import React from "react";
import { FlatList, HStack, Spinner, Text } from "native-base";
// internal
import { useChats } from "../hooks/useChats";
import { Chat } from "../components/chat.component";

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
        <FlatList
          data={Object.keys(chats?.data)}
          renderItem={({ item: chatId }) => <Chat chat={chats?.data[chatId]} />}
        />
      )}
    </>
  );
};
