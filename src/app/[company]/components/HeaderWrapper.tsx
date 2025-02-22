"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar/SideBar";
import { NavLinks } from "./Sidebar/NavLinks";

const HeaderWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <TopBar handleOpen={handleOpen} />
      <Sidebar
        direction="right"
        NavLinks={NavLinks}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default HeaderWrapper;
