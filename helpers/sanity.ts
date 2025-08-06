import { createClient } from "next-sanity";

const client = createClient({
  projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset: "production",
  apiVersion: "2023-11-18",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export default client;
