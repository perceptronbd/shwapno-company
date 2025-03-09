import LoginLoading from "@/components/auth/loading";
import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

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
    <Suspense fallback={<LoginLoading />}>
      <DelayedLoginForm />
    </Suspense>
  );
}
