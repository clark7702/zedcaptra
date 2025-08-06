import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Card } from "@mui/material";

export default function SimpleSnackbar({ open, setOpen, message, severity }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(!open);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={action}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
