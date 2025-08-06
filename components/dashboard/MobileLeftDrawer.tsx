import { Drawer } from "@mui/material";

import NestedList from "../general/NestedList";
import { User } from "../../types/user";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

function MobileDrawer({ open, onClose, user }: MobileDrawerProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <NestedList user={user} />
    </Drawer>
  );
}

export default MobileDrawer;
