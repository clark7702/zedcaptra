"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { StaticImageData } from "next/legacy/image";
import Link from "next/link";

export interface BankingCardProps {
  image: string | StaticImageData;
  description: string;
  link: string;
  className?: string;
}

function BankingCard({
  image,
  description,
  link,
  className,
}: Readonly<BankingCardProps>) {
  return (
    <div className={`${className} flex flex-col border rounded-t-lg`}>
      <div className=" rounded-t-lg row-span-2 relative">
        <Image
          src={image}
          alt="banking"
          className="rounded-t-lg aspect-video object-cover"
        />
      </div>
      <div className="px-3 py-5">
        <p className="text-sm md:text-base font-medium mb-4">{description}</p>
        <Link href={link}>
          <Button variant="contained">Learn More</Button>
        </Link>
      </div>
    </div>
  );
}

export default BankingCard;
