import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./lib/sanity/schemas";
import { bankName } from "./constants/Settings";

export default defineConfig({
  basePath: "/admin",
  name: "default",
  title: `${bankName} Admin Panel`,

  projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
