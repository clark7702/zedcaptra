"use client";
import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { BiArrowToTop } from "react-icons/bi";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, [visible]);

  if (!visible) return null;

  return (
    <button className="fixed right-10 bottom-20 text-4xl text-green-700 hidden hover:border rounded-full p-1 sm:block transition-all">
      <BiArrowToTop size={40} onClick={scrollToTop} />
    </button>
  );
};

export default ScrollButton;
