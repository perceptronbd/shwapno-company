"use client";

import { cn } from "@/shared-components";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            `group toast
            data-[type=success]:group-[.toaster]:bg-success-100 data-[type=success]:group-[.toaster]:text-success-400
            data-[type=error]:group-[.toaster]:bg-error-100 data-[type=error]:group-[.toaster]:text-error-400
            data-[type=warning]:group-[.toaster]:bg-warning-100 data-[type=warning]:group-[.toaster]:text-warning-400
            data-[type=default]:group-[.toaster]:bg-gray-100 data-[type=default]:group-[.toaster]:text-gray-600`,
            className,
          ),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
