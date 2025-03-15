"use client";

import React, { useState } from "react";
import TopBar from "./top-bar";

import { Sidebar } from "@/shared-components";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "../utils/nav-link";

const HeaderWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="w-full px-2">
      <TopBar handleOpen={handleOpen} />
      <Sidebar
        LinkComponent={Link}
        Logo={
          <Image
            width={88}
            height={48}
            src="/shwapno-logo.svg"
            alt="shwapno-logo"
          />
        }
        currentPath={pathname}
        isOpen={isOpen}
        onClose={handleClose}
        NavLinks={NavLinks}
        direction="right"
      />
    </div>
  );
};

export default HeaderWrapper;
