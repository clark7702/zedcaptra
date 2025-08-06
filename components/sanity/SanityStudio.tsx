"use client";
import { NextStudio } from "next-sanity/studio";
import React from "react";

import config from "../../sanity.config";

function SanityStudio() {
  return <NextStudio config={config} unstable_globalStyles />;
}

export default SanityStudio;
