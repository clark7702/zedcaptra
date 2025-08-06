"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { FiMenu } from "react-icons/fi";

import MobileLeftDrawer from "./MobileLeftDrawer";
import PopOver from "./PopOver";

import logoimg from "../../assets/brand/logo.png";
import Link from "next/link";
import { User } from "../../types/user";
import { Avatar } from "@mui/material";
import Image from "next/image";

interface Props {
  user: User;
}

export default function MobileAppBar({ user }: Props) {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
  const [openTopDrawer, setOpenTopDrawer] = useState(false);
  const toggleLeftDrawer = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };

  return (
    <>
      <AppBar position="static">
        <div className="flex flex-row items-center justify-between p-3 border-slate-700 border-b">
          <div className="flex space-x-4 items-center">
            <FiMenu
              className="text-3xl"
              onClick={() => setOpenLeftDrawer(!openLeftDrawer)}
            />
          </div>
          <Link href="/secure/dashboard">
            <Image src={logoimg} alt="logo" width={200} height={50} />
          </Link>
          <PopOver element={<Avatar src={`${user?.imageUrl || ""} `} />} />
        </div>
      </AppBar>
      <MobileLeftDrawer
        user={user}
        open={openLeftDrawer}
        onClose={toggleLeftDrawer}
      />
    </>
  );
}
