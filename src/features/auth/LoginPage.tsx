import { Formik, Form, Field, type FormikHelpers } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./authSlice";

interface LoginValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
    ) => {
        try{
            const data = await login(values).unwrap();
            dispatch(setCredentials(data));
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-95">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign in</h1>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                            <Field
                               id="email"
                               name="email"
                               type="email"
                               className="border p-2 w-full mb-4 rounded-md"
                               placeholder="Email"
                               required
                            />
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="password"
                            >
                                Password
                            </label>
                            <Field
                               id="password"
                               name="password"
                               type="password"
                               className="border p-2 w-full mb-4 rounded-md"
                               placeholder="Password"
                               required
                            />
                            <button
                              type="submit"
                              disabled={isLoading || isSubmitting}
                              className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700"
                            >
                                { isLoading || isSubmitting ? "Signing in..." : "Login" }
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    Invalid credentials
                                </p>
                            )}

                        </Form>
                    )} 

                </Formik>

            </div>

        </div>
    )
}

export default LoginPage;