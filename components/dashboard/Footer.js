import React from "react";
import { bankName, bankYear } from "../../constants/Settings";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className='hidden sm:block py-6 text-center'>
      <h1>
        Copyright &copy; {bankName} {bankYear} - {year}
      </h1>
    </div>
  );
}

export default Footer;
