import { Text } from "@/shared-components";
import { Bell, Menu, User as UserIcon } from "lucide-react";
import React from "react";
import { User } from "@/stores/states/auth.state";
import storage from "../utils/local-storage";

interface TopBarProps {
  readonly handleOpen: () => void;
}

const TopBar = ({ handleOpen }: TopBarProps) => {
  const storedData = storage.get("loggedUser");
  const user = storedData as User;

  console.log(user);
  return (
    <div className="mt-16 flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-200 text-white">
          <UserIcon strokeWidth={1} className="h-5 w-5" />
        </span>
        <Text className="flex flex-col" variant="bodyBase">
          {user?.firstName}
          <span>{user?.roles[0]}</span>
        </Text>
      </div>
      <div className="flex items-center gap-3 text-base">
        <Bell />
        <Menu onClick={handleOpen} />
      </div>
    </div>
  );
};

export default TopBar;
