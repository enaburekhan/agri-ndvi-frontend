import { useState } from "react";
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const data = await login({ email, password }).unwrap();
            dispatch(setCredentials(data));
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login failed", err)
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                <input
                  type="email"
                  className="border p-2 w-full mb-4 rounded-md"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="border p-2 w-full mb-4 rounded-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700"
                >
                    { isLoading ? "Signing in..." : "Login" }
                </button>
                { error && (
                    <p className="text-red-500 text-sm mt-2">Invalid credentials</p>
                )}
            </form>

        </div>
    )
}