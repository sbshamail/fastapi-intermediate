import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { nextapi } from '../../../../config';
import { ProductDataType } from '@/utils/interfaces/responseTypes/responseTypes';

// convert params into query
export const toQueryString = (params = {}) => {
  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
    )
    .join('&');

  return query;
};

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: nextapi }),
  refetchOnMountOrArgChange: 0,
  endpoints: (builder) => ({
    // getProduct is main variable (useGetProductQuery)
    getProduct: builder.query<
      { result: ProductDataType[]; count: number },
      {
        limit: number;
        page: number;
        searchTerm: string;
        categories?: string[];
      }
    >({
      query: (params) => {
        const query = toQueryString(params);
        // console.log(query);
        return {
          url: `/product?${query}`,
          method: 'GET',
        };
      },

      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Use serialized arguments as part of the cache key
        // return endpointName;
        return `${endpointName}-${JSON.stringify({
          categories: queryArgs.categories,
        })}`;
      },

      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (!currentCache) {
          return newItems; // If there's no current cache, return new items
        }
        if (arg.page === 0) {
          currentCache.result = newItems.result;
          currentCache.count = newItems.count;
          return;
        }
        const existingIds = new Set(currentCache.result.map((item) => item.id));
        const mergedResults = [
          ...currentCache.result,
          ...newItems.result.filter((item) => !existingIds.has(item.id)), // Filter out duplicates
        ];
        return {
          result: mergedResults,
          count: newItems.count,
        };
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    //mutation
    dispatchProduct: builder.mutation<ProductDataType[], { limit: number }>({
      query: (params) => {
        const query = toQueryString(params);
        return {
          url: `/product?${query}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProductQuery, useDispatchProductMutation } = productApi;
