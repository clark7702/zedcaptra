import List from "@mui/material/List";

import Link from "next/link";

import { MdDashboard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsMailbox } from "react-icons/bs";

import logoimg from "../../assets/brand/logo.png";
import { Avatar, ListItemButton, ListItemIcon } from "@mui/material";
import { User } from "../../types/user";
import SignOut from "./SignOut";
import CollapsibleListItem from "./CollapsibleListItem";
import { logOut } from "../../lib/actions";
import Image from "next/image";

function capitalizeWords(text) {
  return text.replace(/(?:^|\s)\S/g, (res) => {
    return res.toUpperCase();
  });
}

export default function NestedList({ user }: { readonly user: User }) {
  return (
    <div className="h-full py-5">
      <div className="flex flex-col items-center">
        <Link href="/secure/dashboard">
          <div className="mb-8 mt-2 sm:mt-0">
            <Image src={logoimg} alt="logo" width={180} height={50} />
          </div>
        </Link>
        <div className="px-4">
          <List
            className="flex flex-col gap-y-4"
            sx={{
              height: "100%",
              width: 240,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Link href="/secure/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <MdDashboard className="text-3xl" />
                </ListItemIcon>
                Dashboard
              </ListItemButton>
            </Link>
            <CollapsibleListItem />

            <Link href="/secure/transactions">
              <ListItemButton>
                <ListItemIcon>
                  <BsMailbox className="text-3xl" />
                </ListItemIcon>
                <span>E-Statement</span>
              </ListItemButton>
            </Link>

            <Link href="/secure/profile/settings">
              <ListItemButton>
                <ListItemIcon>
                  <AiOutlineUser className="text-3xl" />
                </ListItemIcon>
                <span>Profile</span>
              </ListItemButton>
            </Link>

            <Link href="/secure/profile/changepassword">
              <ListItemButton>
                <ListItemIcon>
                  <FiSettings className="text-3xl" />
                </ListItemIcon>
                <span>Settings</span>
              </ListItemButton>
            </Link>

            <Link href="/secure/support/open-ticket">
              <ListItemButton>
                <ListItemIcon>
                  <BiSupport className="text-3xl" />
                </ListItemIcon>
                <span>Get Help</span>
              </ListItemButton>
            </Link>

            <div>
              <SignOut logOut={logOut} />
            </div>
          </List>
        </div>
      </div>

      <div className="flex flex-col items-center border-t border-slate-200 absolute bottom-0">
        <div className="flex space-x-3 items-center px-6 py-5">
          <Avatar src={user?.imageUrl || ""} />
          <div className="">
            <h1 className="text-xs font-semibold">
              {capitalizeWords(`${user?.firstName} ${user?.lastName}`)}
            </h1>
            <h1 className="text-sm"> {user?.email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
