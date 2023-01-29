import { api } from ".";

export const createBookClient = async (data: any) => {
  return api.post("/book", {
    ...data,
  });
};

export const editBookClient = async (data: any) => {
  return api.patch("/book", {
    ...data,
  });
};

export const getBookClient = async (id: string) => {
  return api.get(`/book/${id}`);
};

export const getBooksClient = async (
  page: number,
  amount: number,
  since: Date | undefined,
  until: Date | undefined,
  search: string | undefined
) => {
  const params: Record<string, any> = {
    page,
    amount,
  };

  if (since) params.since = since;

  if (until) params.until = until;

  if (search) params.search = search;

  return await api.get(`/book`, {
    params,
  });
};

export const getFavoritesClient = async (ids: string[]) => {
  return api.post(`/book/favorites`, {
    favorites: ids,
  });
};

export const getRandomBookClient = async () => {
  return api.get("/book/search/random");
};
