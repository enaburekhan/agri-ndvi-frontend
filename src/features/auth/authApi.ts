import { api } from "../../app/api";

interface LoginResponse {
    token: string;
    user: { id: number; email: string };
};

interface LoginRequest {
    email: string;
    password: string; 
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/users/sign_in",
                method: "POST",
                body,
            }),
        }),
        signup: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false
});

export const { useLoginMutation, useSignupMutation } = authApi;