"use client";

import {
  Button,
  CustomToast,
  FloatingLabelInput,
  Text,
} from "@/shared-components";
import { useLoginMutation } from "@/stores/services/auth.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import {
  LoginValidation,
  LoginValidationType,
} from "@/validations/login-validations";
import { ROUTES } from "@/utils/routes";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
  });

  const onSubmit = async (data: LoginValidationType) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
        rememberMe: true,
      }).unwrap();

      // Handle success (e.g., store token, redirect, etc.)
      if (result.accessToken.length > 0) {
        setTimeout(() => {
          toast(
            <CustomToast
              title="Login Successful"
              description="Logged in successfully!"
              type="success"
            />,
          );
          router.push(ROUTES.ORDERS);
        }, 2000); // 2 seconds delay
      }
    } catch (error: unknown) {
      // Handle error (e.g., show error message)
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <section className="relative h-screen w-full">
      <div
        className={`h-screen w-full transform shadow-lg transition-all duration-500 ease-out ${isVisible ? "translate-y-0" : "translate-y-3"}`}
      >
        <section className="absolute bottom-0 flex h-[80dvh] w-full items-center justify-center rounded-t-2xl bg-white p-8">
          <div className="w-full space-y-8">
            <article>
              <Text
                variant="headerMedium"
                weight="bold"
                className="text-center text-secondary-400"
              >
                Login
              </Text>
            </article>
            <form
              className="w-full space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FloatingLabelInput
                className="w-full"
                label="Email"
                placeholder="Login"
                Icon={Mail}
                {...register("email")}
                errorMessage={errors.email?.message}
              />
              <div className="space-y-2">
                <FloatingLabelInput
                  label="Password"
                  placeholder="Password"
                  type="password"
                  Icon={Lock}
                  {...register("password")}
                  errorMessage={errors.password?.message}
                />
                <Text variant="bodySmall" className="text-neutral-300">
                  Forgot your password? &nbsp;
                  <Link
                    href={"/"}
                    className="border-primary-400 text-primary-400 hover:border-b-2"
                  >
                    Reset Password
                  </Link>
                </Text>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                Log in
              </Button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}
