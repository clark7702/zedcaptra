import { Box, Fade } from "@mui/material";
import Image from "next/image";
import React from "react";
import img from "../../assets/images/woman-holding-coffee-and-working-on-lapton.jpeg";
import { motion } from "framer-motion";

function MoveMoneyCard({ title, description, image }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="cursor-pointer"
    >
      <Box className="rounded-md ">
        <Image
          src={image}
          alt="move money"
          height={500}
          className="hover:opacity-70 rounded-md"
        />
        <div className="flex flex-col space-y-4 mt-4">
          <h1 className="font-semibold text-lg">{title}</h1>
          <p>{description}</p>
        </div>
      </Box>
    </motion.div>
  );
}

export default MoveMoneyCard;
