"use client";

import React, { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar/SideBar";

const HeaderWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <TopBar handleOpen={handleOpen} />
      <Sidebar isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default HeaderWrapper;
