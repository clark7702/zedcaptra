"use client";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface PasswordInput {
  register?: any;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  minLength?: number;
  value?: string;
  placeholder?: string;
  label?: string;
}

function PasswordInput({
  disabled,
  register,
  required,
  error,
  name,
  minLength,
  value,
  placeholder = "Enter your password",
  label,
}: Readonly<PasswordInput>) {
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setshowPassword(!showPassword);
  };

  return (
    <>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <FormControl error={error} sx={{ width: "100%" }} variant="outlined">
        <OutlinedInput
          size="small"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder={placeholder}
          value={value}
          {...register(name, {
            required: required,
            minLength: minLength,
          })}
        />
      </FormControl>
    </>
  );
}

export default PasswordInput;
