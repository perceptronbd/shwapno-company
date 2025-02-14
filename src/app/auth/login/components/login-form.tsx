"use client";

import { FloatingLabelInput } from "@/shared-components";
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
        <div className="absolute bottom-0 h-[70dvh] w-full rounded-t-2xl bg-white p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <FloatingLabelInput
              className="w-full"
              label="Login"
              placeholder="Login"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
