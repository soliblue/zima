import React, { useMemo } from "react";
import { Text, HStack, VStack } from "native-base";
// internal
import { processUserInputs, getTopTopics } from "../utils/textProcessing";

export const TopicAnalytics = ({ chats }) => {
  const words = useMemo(() => processUserInputs(chats), [chats]);
  const topTopics = useMemo(() => getTopTopics(words, 50), [words]);

  return (
    <VStack>
      <Text>Topic Analytics</Text>
      <VStack>
        <HStack>
          <Text flex={1} fontWeight="semibold">
            Topic
          </Text>
          <Text flex={1} fontWeight="semibold">
            Frequency
          </Text>
        </HStack>
        {topTopics.map(([topic, frequency], index) => (
          <HStack key={index}>
            <Text flex={1}>{topic}</Text>
            <Text flex={1}>{frequency}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
