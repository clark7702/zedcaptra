import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "submit" | "button";
  className?: string;
}

function Button({
  text,
  disabled,
  style,
  type = "submit",
  className,
}: Readonly<ButtonProps>) {
  return (
    <button
      style={style}
      type={type}
      disabled={disabled}
      className={`${className} font-medium py-2 px-4 rounded-md  bg-primary hover:shadow-sm hover:shadow-green-700  focus:outline outline-green-800  disabled:opacity-80 disabled:cursor-not-allowed text-white`}>
      {text}
    </button>
  );
}

export default Button;
