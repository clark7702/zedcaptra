"use client";
import { Card } from "@mui/material";
import React from "react";
import { BsCreditCard } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function ServicesCard({ title, icon, link }: Props) {
  return (
    <Card
      variant="outlined"
      className=" flex flex-col items-center justify-center rounded-md h-36 w-40 md:w-44 cursor-pointer"
    >
      <div className="text-4xl md:text-5xl mb-5 text-primary">{icon}</div>
      <h1>{title}</h1>
    </Card>
  );
}

export default ServicesCard;
