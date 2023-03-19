import React from "react";
import { FlatList, Modal, Text, Box, Pressable, HStack } from "native-base";
import { Link } from "react-ionicons";

export const Chat = ({ chat }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Box m={1}>
      <Modal isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <FlatList
              data={chat?.messages}
              renderItem={({ item: message }) => <Text>{message.content}</Text>}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Pressable py={1} onPress={() => setIsExpanded(!isExpanded)}>
        <HStack alignItems={"center"} space={1} justifyContent="space-between">
          <Text noOfLines={1} fontSize="xs">
            {chat?.title}
          </Text>
          <Link
            height={"15px"}
            width={"15px"}
            onClick={() => {
              // eslint-disable-next-line no-undef
              chrome.tabs.create({
                url: `https://chat.openai.com/chat/${chat?.id}`,
              });
            }}
          />
        </HStack>
      </Pressable>
    </Box>
  );
};
