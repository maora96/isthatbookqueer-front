import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getBookClient,
  getBooksClient,
  getFavoritesClient,
  getRandomBookClient,
} from "../api/client";

export const useGetBook = (id: string) => {
  return useQuery(["getBook", id], async () => getBookClient(id), {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useGetFavorites = (ids: string[]) => {
  return useQuery(["getFavorites", ids], async () => getFavoritesClient(ids), {
    refetchOnWindowFocus: false,
    enabled: !!ids,
  });
};

export const useGetRandomBook = () => {
  return useQuery("getRandomBook", async () => getRandomBookClient(), {
    refetchOnWindowFocus: false,
  });
};
