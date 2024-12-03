import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authapi } from '../../../../config';
import { SignupTypes } from '@/utils/interfaces/formTypes/authformTypes';
import { AuthResponseType } from '@/utils/interfaces/responseTypes/responseTypes';

export const authApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: authapi }),
  endpoints: (builder) => ({
    // Endpoint for user signup
    signup: builder.mutation<AuthResponseType, SignupTypes>({
      query: (user) => {
        return {
          url: '/user/create', // Replace with your actual signup endpoint
          method: 'POST',
          body: user, // Pass the user data to the backend
        };
      },
    }),
  }),
});

export const { useSignupMutation } = authApi;
