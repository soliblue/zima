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

export const ChatAlert = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onCloseAlert = () => {
    // Store the flag in local storage to remember the user has closed the alert
    localStorage.setItem("chatAlertClosed", "true");
    setIsCollapsed(true);
  };

  React.useEffect(() => {
    setIsCollapsed(localStorage.getItem("chatAlertClosed") ? true : false);
  }, []);

  return (
    <Collapse isOpen={!isCollapsed}>
      <Alert status="info">
        <HStack space={2}>
          <Alert.Icon size={"xs"} pt={1} />
          <Text fontSize="xs">
            Ensure you're on https://chat.openai.com/ before syncing your chats.
            Refresh if just installed. Your chats will only be stored locally,
            allowing you to download and search them with ease.
          </Text>
          <Pressable onPress={onCloseAlert}>
            <CloseIcon size={"xs"} />
          </Pressable>
        </HStack>
      </Alert>
    </Collapse>
  );
};
