import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, IUser } from "./types";
// import { IRepo } from "../../types/Repos";
// import { IUser, SearchQueryResponse } from "../../types/Users";

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
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
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
