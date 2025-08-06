import SanityStudio from "../../components/sanity/SanityStudio";

import type { Metadata, ServerRuntime } from "next";

import { metadata as studioMetadata } from "next-sanity/studio/metadata";
import { bankName } from "../../constants/Settings";

// export const runtime: ServerRuntime = "edge";

export const metadata: Metadata = {
  ...studioMetadata,
  title: `${bankName} Admin Panel`,
};

export default function StudioPage() {
  return <SanityStudio />;
}
