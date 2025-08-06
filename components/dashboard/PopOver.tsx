import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Card, ListItemButton, ListItemIcon } from "@mui/material";
import { RiLockPasswordLine } from "react-icons/ri";

import SignOut from "../general/SignOut";
import { logOut } from "../../lib/actions";

export default function BasicPopover({ element }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button size="small" variant="text" onClick={handleClick}>
        {element}
      </Button>
      <Popover
        className="mt-5 "
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card className="flex flex-col items-start space-y-3 p-4">
          <Link href="/secure/profile/changepassword">
            <ListItemButton>
              <ListItemIcon>
                <RiLockPasswordLine className="text-2xl" />
              </ListItemIcon>
              Change Password
            </ListItemButton>
          </Link>

          <div className="w-full">
            <SignOut logOut={logOut} />
          </div>
        </Card>
      </Popover>
    </>
  );
}
