import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { Link } from "react-router-dom";

interface LoginValues {
    email: string;
    password: string;
};

// Yup validation schema
const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
})

const LoginPage: React.FC = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
    ) => {
        try{
            const data = await login({
                email: values.email,
                password: values.password
            }).unwrap();
            dispatch(setCredentials(data));
            window.location.href = "/";
        } catch (err) {
            console.error("Login failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-1/2 max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center mb-6">Welcome Back</h1>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <Field
                               id="email"
                               name="email"
                               type="email"
                               className="mt-1 border p-2 w-full mb-4 rounded-lg focus:ring-green-500"
                               placeholder="Email"
                               required
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                            </div>
                            <div className="mb-6">
                                <label
                              className="text-sm font-medium"
                              htmlFor="password"
                            >
                                Password
                            </label>
                            <Field
                               id="password"
                               name="password"
                               type="password"
                               className="mt-1 border p-2 w-full mb-4 rounded-lg focus:ring-green-500"
                               placeholder="Password"
                               required
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 text-xs mt-1 mb-6"
                            />
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <button
                              type="submit"
                              disabled={isLoading || isSubmitting}
                              className="w-1/4 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition"
                            >
                                { isLoading || isSubmitting ? "Signing in..." : "Login" }
                            </button>
                            </div>
                            
                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    Invalid credentials
                                </p>
                            )}
                            {/* Toggle link */}
                            <p className="text-sm text-center mt-4">
                                Don't have an account? {" "}
                                <Link to="/users" className="text-green-600 font-semibold hover:underline">
                                  Sign up
                                </Link>

                            </p>

                        </Form>
                    )} 

                </Formik>

            </div>

        </div>
    )
}

export default LoginPage;