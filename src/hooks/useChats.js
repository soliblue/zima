/* eslint-disable no-undef */
import { useQuery } from "react-query";

export const useChats = (search) => {
  return useQuery(
    ["chats", search],
    () => {
      console.debug(`💬 Chats ....`);
      return chrome?.storage?.local?.get().then((chats) => {
        if (search) {
          const searchRegex = new RegExp(search, "i");
          chats = Object.keys(chats)
            .map((key) => chats[key])
            .filter(
              (chat) =>
                searchRegex.test(chat.title) ||
                chat.messages.some((message) =>
                  searchRegex.test(message.content)
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
