import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useSignupMutation } from "./authApi";
import { setCredentials } from "./authSlice";

interface SignupValues {
    email: string;
    password: string;
    password_confirmation: string;
};

// Yup validation schema
const SignupSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Pasword confirmation is required"),
     
})


const SignupPage: React.FC = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) => {
    try {
        const data = await signup({
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
        }).unwrap();
        dispatch(setCredentials(data));
        window.location.href = "/";
    } catch (err) {
        console.error("Signup failed", err);
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-1/2 max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
                password_confirmation: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="email">Email</label>
                    <Field
                       id="email"
                       name="email"
                       type="email"
                       className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                       placeholder= "Email"
                       required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                    </div>
                    <div>
                       <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <Field
                       id="password"
                       name="password"
                       type="password"
                       className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                       placeholder= "Password"
                       required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1" htmlFor="password_confirmation">Confirm Password</label>
                    <Field
                       id="password_confirmation"
                       name="password_confirmation"
                       type="password"
                       className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                       placeholder= "Confirm Password"
                       required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <button
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      className="bg-green-600 text-white w-1/4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      {isLoading || isSubmitting ? "Creating account..." : "Sign Up"} 
                    </button>
                    </div>
                    
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                           Signup failed. Please try again
                        </p>
                       )}
                       {/* Toggle Link */}
                       <p className="text-sm text-center mt-4">
                          Already have an Account?{" "}
                          <Link to="/users/sign-in" className="text-green-600 font-semibold hover:underline">
                            Sign in
                          </Link>
                       </p>
                </Form>
              )}
            </Formik>

        </div>

    </div>
  )
}

export default SignupPage;