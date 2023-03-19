/* eslint-disable no-undef */
import React from "react";
import {
  Text,
  HStack,
  Alert,
  Collapse,
  CloseIcon,
  Pressable,
} from "native-base";

export const ChatDownloadAlert = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  return (
    <Collapse isOpen={!isCollapsed}>
      <Alert status="info">
        <HStack space={1}>
          <Alert.Icon size={"xs"} pt={3} />
          <Text fontSize="xs">
            Please make sure you are on the chat.openai.com website before
            saving chats
          </Text>
          <Pressable onPress={() => setIsCollapsed(true)}>
            <CloseIcon size={"xs"} />
          </Pressable>
        </HStack>
      </Alert>
    </Collapse>
  );
};
