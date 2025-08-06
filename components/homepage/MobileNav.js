"use client";
import React from "react";
import logoimg from "../../assets/brand/logo.png";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import MobileDrawer from "./MobileDrawer";

function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="py-4 px-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image src={logoimg} alt="logo" width={180} height={70} />
        </Link>

        <div>
          <FiMenu
            className="text-4xl text-green-700"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <MobileDrawer open={open} setOpen={setOpen} />
    </>
  );
}

export default MobileNav;
