export const DEFAULT_LOGIN_REDIRECT_URL = "/secure/dashboard";

export const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  // "/auth/pin_verification",
];

export const secureRoutes = ["/secure/"];

export const apiAuthPrefix = "/api/auth";

export const adminRoutes = ["/admin", "/admin/*"];

export const publicRoutes = ["/", "/about-us", "/api/admin/user/create"];

export const AppName = "Zedcaptra Holdings";
export const AppAuthor = "Zedcaptra Holdings";

export const contactUs = "contact@zedcaptra.com";

export const AdminEmail = "contact@zedcaptra.com";

export const customerServiceEmail = "contact@zedcaptra.com";

export const AppUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://zedcaptra.com";

export const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
