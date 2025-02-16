import { Metadata } from "next";
import LoginForm from "./components/login-form";
import { Suspense } from "react";
import LoginLoading from "./components/loading";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

async function DelayedLoginForm() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <DelayedLoginForm />
    </Suspense>
  );
}
