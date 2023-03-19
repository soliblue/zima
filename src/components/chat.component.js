import React from "react";
import { FlatList, Modal, Button, Text, Box } from "native-base";

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
      <Button
        py={3}
        shadow={1}
        borderWidth={1}
        borderColor="gray.100"
        variant={"unstyled"}
        _hover={{
          shadow: 3,
        }}
        _text={{
          color: "gray.800",
        }}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        {chat?.title?.slice(0, 5) + "..."}
      </Button>
    </Box>
  );
};
