import { Alert } from "@mui/material";

export type Severity = "success" | "info" | "warning" | "error";

interface CustomAlertProps {
  message?: string;
  severity?: Severity;
  className?: string;
}

function CustomAlert({
  message,
  severity,
  className,
}: Readonly<CustomAlertProps>) {
  return (
    <Alert className={className} severity={severity} variant='standard'>
      {message}
    </Alert>
  );
}

export default CustomAlert;
