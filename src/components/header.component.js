/* eslint-disable no-undef */
import { HStack, Image, Text, VStack } from "native-base";
import { LogoLinkedin, LogoTwitter } from "react-ionicons";

export const Header = () => (
  <HStack justifyContent={"space-between"}>
    <HStack alignItems={"center"} space={1}>
      <Image
        alt="Zima"
        size={"xs"}
        resizeMode="contain"
        source={{ uri: chrome.runtime.getURL("icon.png") }}
      />
      <VStack>
        <Text>Zima</Text>
        <Text fontSize="2xs" color="gray.600">
          ChatGPT Companion
        </Text>
      </VStack>
    </HStack>
    <HStack alignItems={"center"} space={2}>
      <LogoLinkedin
        onClick={() =>
          chrome.tabs.create({
            url: "https://www.linkedin.com/in/asoliman96/",
          })
        }
      />
      <LogoTwitter
        onClick={() =>
          chrome.tabs.create({
            url: "https://twitter.com/solimouse",
          })
        }
      />
    </HStack>
  </HStack>
);
