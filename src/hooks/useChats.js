/* eslint-disable no-undef */
import { useQuery } from "react-query";

export const useChats = () => {
  // const loadChats = async () => {
  //   const allChats = await chrome?.storage?.local?.get();

  //   const filteredChats = Object.entries(allChats).reduce(
  //     (acc, [id, messages]) => {
  //       if (!search) {
  //         acc[id] = messages;
  //       } else {
  //         for (const message of messages) {
  //           if (message.content.includes(search)) {
  //             acc[id] = messages;
  //             break;
  //           }
  //         }
  //       }
  //       return acc;
  //     },
  //     {}
  //   );
  //   setChats(filteredChats);
  // };

  return useQuery(
    ["chats"],
    () => {
      console.debug(`💬 Chats ....`);
      return chrome?.storage?.local?.get().then((chats) => {
        console.debug(`💬 Chats loaded`);
        return chats;
      });
    },
    {
      onError: (error) => console.error(error),
    }
  );
};
