"use client";

import MobileAppBar from "./MobileAppbar";
import DesktopAppbar from "./DesktopAppbar";
import { User } from "../../types/user";

interface Props {
  user: User;
}

function Header({ user }: Props) {
  return (
    <>
      <div className='lg:hidden'>
        <MobileAppBar user={user} />
      </div>

      <div className='hidden lg:block'>
        <DesktopAppbar />
      </div>
    </>
  );
}

export default Header;
