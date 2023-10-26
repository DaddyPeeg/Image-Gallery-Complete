import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePost = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCALIP}:${
          import.meta.env.VITE_SERVER_PORT
        }/upload`
      );
      return data;
    },
  });
};
