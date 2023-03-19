import React from "react";
import { Link } from "react-ionicons";
import { Modal, Text, Box, HStack, Button } from "native-base";

export const ChatSync = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Box m={1}>
      <Modal isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Text>1. Go to https://chat.openai.com/</Text>
            <Text>2. Click on the button below</Text>
            <Text>
              3. Wait for 1-5 minutes till all your chats are successfully
              synced
            </Text>
            <Text>4. Enjoy</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <HStack alignItems={"center"} space={1} justifyContent="space-between">
        <Button
          px={3}
          size="xs"
          variant="link"
          colorScheme={"black"}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          Save Chats
        </Button>
      </HStack>
    </Box>
  );
};
