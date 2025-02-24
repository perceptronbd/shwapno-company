"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar/side-bar";
import TopBar from "./top-bar";
import { NavLinks } from "./sidebar/nav-links";

const HeaderWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div className="w-full px-3">
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
