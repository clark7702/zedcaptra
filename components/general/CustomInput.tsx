import { TextField } from "@mui/material";

interface CustomInputProps {
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
  autoFocus?: boolean;
  register?: any;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  rows?: number;
  color?: "primary" | "secondary";
  defaultValue?: string;
  minLength?: number;
  startAdornment?: any;
  multiline?: boolean;
}

function CustomInput({
  label,
  name,
  className,
  placeholder,
  type,
  value,
  onChange,
  autoFocus,
  register,
  error,
  required,
  disabled,
  hidden,
  rows,
  color,
  defaultValue,
  minLength,
  startAdornment,
  multiline,
}: Readonly<CustomInputProps>) {
  return (
    <>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <TextField
        sx={{
          width: "100%",
        }}
        margin="dense"
        autoFocus={autoFocus}
        type={type}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        error={error}
        variant="outlined"
        size="small"
        disabled={disabled}
        className="outline-none"
        color={color}
        onChange={onChange || null}
        multiline={multiline}
        rows={rows}
        value={value}
        {...register(name, {
          required: required,
          minLength: minLength,
        })}
      />
    </>
  );
}
export default CustomInput;
