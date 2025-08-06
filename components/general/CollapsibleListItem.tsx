"use client";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiTransfer, BiTransferAlt } from "react-icons/bi";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List } from "@mui/material";
import Link from "next/link";

function CollapsibleListItem() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <BiTransfer className="text-3xl" />
        </ListItemIcon>
        <ListItemText primary="Payment" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/secure/payment/domestic">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BiTransfer />
              </ListItemIcon>
              <span>Domestic</span>
            </ListItemButton>
          </Link>
          <Link href="/secure/payment/wire-transfer">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BiTransferAlt className="text-xl" />
              </ListItemIcon>

              <span>International</span>
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </div>
  );
}

export default CollapsibleListItem;
