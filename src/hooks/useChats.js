/* eslint-disable no-undef */
import { useQuery } from "react-query";
import Fuse from "fuse.js";

export const useChats = (search) => {
  return useQuery(
    ["chats", search],
    () => {
      console.debug(`💬 Chats ....`);
      return chrome?.storage?.local?.get().then((chats) => {
        if (search) {
          const fuseOptions = {
            keys: ["title", "messages.content"],
            threshold: 0.3,
          };
          const fuse = new Fuse(Object.values(chats), fuseOptions);
          chats = fuse.search(search).map((result) => result.item);
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
