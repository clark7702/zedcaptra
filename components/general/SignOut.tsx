"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useState, useTransition } from "react";
import { FiLogOut } from "react-icons/fi";

function SignOut({ logOut }: { logOut: () => void }) {
  const [showDialog, setshowDialog] = useState(false);

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <ListItemButton onClick={() => setshowDialog(true)}>
        <ListItemIcon>
          <FiLogOut className='text-3xl' />
        </ListItemIcon>
        <a>Log Out</a>
      </ListItemButton>

      <Dialog open={showDialog}>
        <DialogTitle>
          <h6 className='text-md lg:text-lg'>
            Are you sure you want to logout?
          </h6>
        </DialogTitle>
        <DialogContent>
          <div className='flex justify-between'>
            <Button variant='text' onClick={() => setshowDialog(false)}>
              Cancel
            </Button>
            <Button
              color='error'
              disabled={isPending}
              variant='contained'
              onClick={() => {
                startTransition(() => logOut());
              }}>
              {isPending ? "Logging out..." : "Log Out"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignOut;
