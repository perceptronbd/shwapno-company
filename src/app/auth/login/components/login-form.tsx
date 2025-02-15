"use client";

import { Button, FloatingLabelInput, Icons, Text } from "@/shared-components";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

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
                className="text-secondary-400"
              >
                Login
              </Text>
              <Text variant="bodyBase" className="text-neutral-300">
                Plase provide your credentials
              </Text>
            </article>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <FloatingLabelInput
                className="w-full"
                label="Login"
                placeholder="Login"
                Icon={Icons.Mail}
              />
              <div className="space-y-2">
                <FloatingLabelInput
                  className="w-full"
                  label="Password"
                  placeholder="Password"
                  type="password"
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

              <Button className="w-full"> Log in</Button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}
