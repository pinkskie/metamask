import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, IUser } from "./types";

export const unistoryApi = createApi({
  reducerPath: "unistory/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://new-backend.unistory.app/api/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getUsers: build.query<IUser[], number>({
      query: (page) => `data?page=${page || 0}`,
      transformResponse: (response: IResponse<IUser[]>) => response.items || [],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getUserById: build.query<IUser, number>({
      query: (id) => ({
        url: `data/id/${id}`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = unistoryApi;
