import { api } from "../../app/api";

export interface LoginResponse {
  token: string;
  user: { id: number; email: string };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/users/sign_in",
          method: "POST",
          body: { user: credentials },
        }),
      },
    ),
    signup: builder.mutation<
      LoginResponse,
      { email: string; password: string; password_confirmation: string }
    >({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: { user: credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
