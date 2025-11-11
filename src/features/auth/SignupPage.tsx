import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
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
    <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign up</h1>
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
                <Form>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <Field
                       id="email"
                       name="email"
                       type="email"
                       className="border p-2 w-full mb-4 rounded-md"
                       placeholder= "Email"
                       required
                    />
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <Field
                       id="password"
                       name="password"
                       type="password"
                       className="border p-2 w-full mb-4 rounded-md"
                       placeholder= "Password"
                       required
                    />
                    <label className="block text-sm font-medium mb-1" htmlFor="password_confirmation">Confirm Password</label>
                    <Field
                       id="password_confirmation"
                       name="password_confirmation"
                       type="password"
                       className="border p-2 w-full mb-4 rounded-md"
                       placeholder= "Confirm Password"
                       required
                    />
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700"
                    >
                       {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                           Signup failed. Please try again
                        </p>
                       )}
                    </button>
                </Form>
              )}
            </Formik>

        </div>

    </div>
  )
}

export default SignupPage;