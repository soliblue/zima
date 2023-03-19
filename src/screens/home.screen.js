/* eslint-disable no-undef */
import React from "react";
import { VStack, Text, HStack } from "native-base";
// internal
import { ChatList } from "../components/chat-list.component";
import { ChatAlert } from "../components/chat-alert.component";
import { ChatSave } from "../components/chat-save-component";
import { ChatSearch } from "../components/chat-search.component";

export const HomeScreen = () => {
  const [search, setSearch] = React.useState("");

  return (
    <VStack space={"sm"} p={5}>
      <VStack>
        <Text textAlign={"center"}>Zima</Text>
        <Text textAlign={"center"} fontSize="2xs" color="gray.600">
          ChatGPT Assistant
        </Text>
      </VStack>
      <ChatSearch search={search} setSearch={setSearch} />
      <ChatAlert />

      <HStack justifyContent={"center"}>
        <ChatSave />
      </HStack>

      <ChatList search={search} />
    </VStack>
  );
};
