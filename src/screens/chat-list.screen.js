/* eslint-disable no-undef */
import React from "react";
import { HStack, Spinner, Text, VStack } from "native-base";
// internal hooks
import { useChats } from "../hooks/useChats";
// internal components
import { Header } from "../components/header.component";
import { ChatList } from "../components/chat-list.component";
import { ChatAlert } from "../components/chat-alert.component";
import { ChatSearch } from "../components/chat-search.component";

export const ChatListScreen = () => {
  const [search, setSearch] = React.useState("");
  const chats = useChats(search);

  return (
    <VStack space={"sm"} p={5} width="400px" minHeight={"400px"}>
      <Header />
      <ChatSearch search={search} setSearch={setSearch} />
      <ChatAlert />
      {chats?.isLoading ? (
        <HStack alignItems={"center"} space={1}>
          <Spinner />
          <Text>Loading chats...</Text>
        </HStack>
      ) : (
        <ChatList chats={chats?.data} />
      )}
    </VStack>
  );
};
