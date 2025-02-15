"use client";

import { Button, FloatingLabelInput, Icons, Text } from "@/shared-components";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { authApi, useLoginMutation } from "@/stores/services/auth.service";
import { AuthResponse } from "@/stores/states/auth.state";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginValidation, LoginValidationType } from "../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
  });
 

  const onSubmit = async (data: LoginValidationType) => {
    console.log(data);
    try {
      const result = await login({
        email: data.email,
        password: data.password,
        rememberMe: true,
      }).unwrap();
  
      // Handle success (e.g., store token, redirect, etc.)
      console.log("Login successful:", result);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Login failed:", error);
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
                className="text-secondary-400 text-center"
              >
                Login
              </Text>
              <Text variant="bodyBase" className="text-neutral-300">
                Please provide your credentials
              </Text>
            </article>
            <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabelInput
                className="w-full"
                label="Email"
                placeholder="Login"
                Icon={Icons.Mail}
                {...register("email")}
              />
              <div className="space-y-2">
                <FloatingLabelInput
                  label="Password"
                  placeholder="Password"
                  type="password"
                  Icon={Icons.Lock}
                  {...register("password")}
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
