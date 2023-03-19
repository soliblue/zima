/* eslint-disable no-undef */
import React from "react";
import { Search } from "react-ionicons";
import { Input, Box } from "native-base";

export const ChatSearch = ({ search, setSearch }) => {
  return (
    <Input
      // logic
      value={search}
      onChangeText={setSearch}
      //styling
      px={2}
      py={3}
      shadow={1}
      minWidth={200}
      borderWidth={1}
      borderRadius="md"
      numberOfLines={4}
      variant="unstyled"
      placeholder="Search your saved chats ...."
      _hover={{
        shadow: 5,
      }}
      _focus={{
        shadow: 3,
        placeholderTextColor: "gray.400",
      }}
      InputLeftElement={
        <Box ml={3}>
          <Search height={"10px"} width={"10px"} />
        </Box>
      }
    />
  );
};
