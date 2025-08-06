import { Box } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import chipimg from "../../assets/icons/chip.png";
import visaimg from "../../assets/icons/visa.png";

import logoimg from "../../assets/brand/logo.png";

function VisaCard({ expiringdate, holdername, cardno, color, cvv }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <Box
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      sx={{
        backgroundColor: color,
        minWidth: "320px",
        maxWidth: "370px",
        maxHeight: "240px",
        borderRadius: "6px",
      }}
      className='px-5 py-5 lg:px cursor-pointer text-white flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <Image width={40} height={40} src={chipimg} alt='chip' />
        <Image width={60} height={25} src={visaimg} alt='chip' />
      </div>

      <div className='my-7 text-center text-2xl'>{cardno}</div>
      <div className='flex  justify-between'>
        <div>
          <h1 className='tracking-wide text-slate-300 text-xs'>CARD HOLDER</h1>
          <h1 className='text-lg'>{holdername?.toUpperCase()}</h1>
        </div>
        <div>
          <h1 className='tracking-wide text-slate-300 text-xs'>EXPIRES</h1>
          <h1 className='text-lg'>{expiringdate?.toUpperCase()}</h1>
        </div>
      </div>
    </Box>
  );
}

export default VisaCard;
