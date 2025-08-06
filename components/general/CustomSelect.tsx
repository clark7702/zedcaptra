import { Select, MenuItem, Box, FormControl } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CustomSelectProps {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  register?: any;
  onChange?: (e: any) => void;
  options: {
    value: string;
    title: string;
  }[];
  required?: boolean;
  error?: boolean;
}

function CustomSelect({
  name,
  defaultValue,
  placeholder,
  label,
  register,
  onChange,
  options,
  error,
  required,
}: Readonly<CustomSelectProps>) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <label htmlFor="demo-simselect-label" className="pb-2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <FormControl error={error} variant="outlined" fullWidth>
        <Select
          error={error}
          placeholder={placeholder}
          labelId="demo-simple-select-label"
          value={selectedValue}
          size="small"
          id="demo-simple-select"
          IconComponent={ExpandMoreIcon}
          label={label}
          {...register(name, { required: required })}
          onChange={(e) => {
            setSelectedValue(e.target.value as string);
            onChange && onChange(e);
          }}
        >
          {options?.map((item, index) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomSelect;
