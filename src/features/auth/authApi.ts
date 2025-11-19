import { api } from "../../app/api";

interface LoginResponse {
  token: string;
  user: { id: number; email: string };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  password_confirmation: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/users/sign_in",
        method: "POST",
        body: { user: credentials },
      }),
    }),
    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: { user: credentials },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;
