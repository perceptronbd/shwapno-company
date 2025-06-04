import { Text } from "@/shared-components";
import { Bell, Menu, User as UserIcon } from "lucide-react";
import React from "react";
import { User } from "@/stores/states/auth.state";
import storage from "../utils/local-storage";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";

interface TopBarProps {
  readonly handleOpen: () => void;
}

const TopBar = ({ handleOpen }: TopBarProps) => {
  const storedData = storage.get("loggedUser");
  const user = storedData as User;

  return (
    <div className="flex w-full items-center justify-between py-2">
      <Link href={ROUTES.PROFILE} className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-200 text-white">
          <UserIcon strokeWidth={1} className="h-5 w-5" />
        </span>
        <Text className="flex flex-col" variant="bodyBase">
          {user?.firstName}
          <span className="w-fit rounded-full border border-green-500 bg-green-200 px-2 text-sm text-green-500">
            {user?.roles[0]}
          </span>
        </Text>
      </Link>
      <div className="flex items-center gap-3 text-base">
        <Bell />
        <Menu onClick={handleOpen} />
      </div>
    </div>
  );
};

export default TopBar;
