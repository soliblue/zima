import { useQuery } from "react-query";
import levenshtein from "fast-levenshtein";

export const useChats = (search) => {
  return useQuery(
    ["chats", search],
    () => {
      console.debug(`💬 Chats ....`);
      // eslint-disable-next-line no-undef
      return chrome?.storage?.local?.get().then((chats) => {
        if (search) {
          const similarityThreshold = 3; // Adjust this value based on your requirements
          const isSimilar = (str1, str2) =>
            levenshtein.get(str1, str2) <= similarityThreshold;

          chats = Object.keys(chats)
            .map((key) => chats[key])
            .filter(
              (chat) =>
                isSimilar(chat.title, search) ||
                chat.messages.some((message) =>
                  isSimilar(message.content, search)
                )
            );
        }
        console.debug(`💬 Chats loaded`);
        return chats;
      });
    },
    {
      onError: (error) => console.error(error),
    }
  );
};
