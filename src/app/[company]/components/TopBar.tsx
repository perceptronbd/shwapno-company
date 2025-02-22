import { Button } from "@/shared-components";
import React from "react";

interface TopBarProps {
  readonly handleOpen: () => void;
}

const TopBar = ({ handleOpen }: TopBarProps) => {
  return (
    <div>
      This is topbar
      <Button onClick={handleOpen}>open</Button>
    </div>
  );
};

export default TopBar;
