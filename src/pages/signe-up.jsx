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

const SignUpPage = () => {
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <ErrorMessage error={error} />
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
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
            <SubmitButton className="bg-blue-500 text-white hover:bg-blue-600">
              Sign Up
            </SubmitButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
