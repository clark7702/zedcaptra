"use client";
import React from "react";
import { Drawer, Button } from "@mui/material";
import Link from "next/link";

function MobileDrawer({ open, setOpen, children }) {
  return (
    <Drawer anchor='top' open={open} onClose={() => setOpen(false)}>
      <div className='flex flex-col items-center space-y-6 m-4'>
        <Link href={"/our-services/#personal-banking"} >Personal</Link>

        <Link href={"/our-services/#commercial-banking"}>Corporate</Link>

        <Link href={"/about-us"}>About Us</Link>

        <Link href={"/auth/signin"}>
          <Button variant='contained'>Online Banking</Button>
        </Link>
      </div>
    </Drawer>
  );
}

export default MobileDrawer;
