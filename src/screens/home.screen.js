/* eslint-disable no-undef */
import React from "react";
import { VStack } from "native-base";
// internal
import { ChatList } from "../components/chat-list.component";
import { ChatAlert } from "../components/chat-alert.component";
import { ChatSearch } from "../components/chat-search.component";
import { Header } from "../components/header.component";

export const HomeScreen = () => {
  const [search, setSearch] = React.useState("");

  return (
    <VStack space={"sm"} p={5} width="400px" minHeight={"400px"}>
      <Header />
      <ChatSearch search={search} setSearch={setSearch} />
      <ChatAlert />
      <ChatList search={search} />
    </VStack>
  );
};
