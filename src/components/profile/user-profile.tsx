"use client";

import { Button, Chips, Text } from "@/shared-components";
import { useLogoutMutation } from "@/stores/services/auth.service";
import { useGetProfileQuery } from "@/stores/services/user.service";
import { ChevronLeft, Edit, Phone, RefreshCcw, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { COMPANY } from "../../../utils/constants";

const UserProfile = () => {
  const { data, isLoading, error } = useGetProfileQuery();
  const [logout, { isLoading: isLogoutLoading, error: logoutError }] =
    useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    if (logoutError) {
      toast.error(logoutError?.message || "An error occurred during logout");
    }
  }, [logoutError]);

  const handleLogout = () => {
    logout();
    router.push(`/${COMPANY}/login`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile</p>;

  console.log(data);
  return (
    <article className="flex h-screen flex-col bg-white px-3 py-16">
      <div>
        {/* header */}
        <div className="flex h-12 items-center justify-between">
          <span className="flex items-center">
            <ChevronLeft />
            <Text variant="titleLarge" weight="bold">
              Profile
            </Text>
          </span>
          <Edit />
        </div>
        {/* profile */}
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-200 text-white">
              <User strokeWidth={1} className="h-12 w-12" />
            </span>
            <span className="mt-2 flex flex-col items-center space-y-2">
              <Text variant="titleLarge">{`${data?.firstName}  ${data?.lastName}`}</Text>
              <Text
                className="flex items-center gap-2 text-primary-500"
                variant="bodySmall"
              >
                {data?.email}
                <RefreshCcw size={12} />
              </Text>
              <Chips className="p-0 px-1" variant="success">
                {data?.userRoles[0]?.role?.name}
              </Chips>
            </span>
          </div>
        </div>
        {/* basic info */}
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Text variant="bodyBase">Contact Information</Text>
            <div className="flex w-full items-center gap-2 bg-secondary-100 px-4 py-2 text-lg">
              <Phone /> {data?.phone}
            </div>
            <div className="flex w-full items-center gap-2 bg-secondary-100 px-4 py-2 text-lg">
              <Phone /> {data?.phone}
            </div>
          </div>
          <div className="space-y-2">
            <Text variant="bodyBase">Personal Information</Text>
            <div className="flex w-full items-center gap-2 bg-secondary-100 px-4 py-2 text-lg">
              <Phone /> {data?.phone}
            </div>
            <div className="flex w-full items-center gap-2 bg-secondary-100 px-4 py-2 text-lg">
              <Phone /> {data?.phone}
            </div>
          </div>
        </div>
      </div>
      {/* logout */}
      <div className="flex h-full flex-grow items-end pb-4">
        <Button
          loading={isLogoutLoading}
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </article>
  );
};

export default UserProfile;
