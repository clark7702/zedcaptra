"use client";
import { AppBar, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserIP } from "../../lib/actions";
import theme from "@/lib/theme";

function DesktopAppbar() {
  const date = new Date().toUTCString();

  const { data: userLocation, isLoading } = useQuery({
    queryKey: ["userLocation"],
    queryFn: async () => {
      return await getUserIP();
    },
  });

  return (
    <AppBar position="static">
      <div className="py-7 px-6 lg:px-10 flex justify-between border-b border-slate-700">
        <div>
          <h1 className="flex items-center space-x-2">
            <span className="font-semibold">Logged IP: </span>{" "}
            {isLoading ? (
              <Skeleton variant="text" width={100} />
            ) : (
              userLocation?.ip
            )}
          </h1>
        </div>
        <div>
          <h1>{date}</h1>
        </div>
      </div>
    </AppBar>
  );
}

export default DesktopAppbar;
