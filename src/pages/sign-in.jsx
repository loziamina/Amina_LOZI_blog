import { emailValidator, passwordValidator } from "@/utils/validators";
import { useSession } from "@/web/components/SessionContext";
import ErrorMessage from "@/web/components/ui/ErrorMessage";
import Form from "@/web/components/ui/Form";
import FormField from "@/web/components/ui/FormField";
import SubmitButton from "@/web/components/ui/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { object } from "yup";
const apiClient = require("@/web/services/apiClient");

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object({
  email: emailValidator.label("E-mail"),
  password: passwordValidator.label("Password"),
});

const SignInPage = () => {
  const router = useRouter();
  const { saveSessionToken } = useSession();
  const { mutateAsync, error } = useMutation({
    mutationFn: (values) => apiClient.post("/sessions", values),
  });

  const handleSubmit = async (values) => {
    const { result: jwt } = await mutateAsync(values);

    saveSessionToken(jwt);

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <ErrorMessage error={error} />
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="mt-4">
            <FormField
              name="email"
              type="email"
              placeholder="Enter your e-mail"
              label="E-mail"
              className="mb-4"
            />
            <FormField
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              className="mb-4"
            />
            <SubmitButton className="w-full">Sign In</SubmitButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
