"use client";
import { createContext, useState, useEffect, useMemo } from "react";
import CryptoJS from "crypto-js";

export const ProgressContext = createContext<{
  progress: number;
  setProgress: (callback: (progress: number) => number) => void;
}>({
  progress: 0,
  setProgress: () => {},
});

function ProgressBarContext({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (sessionStorage.getItem("progress") !== null) {
      const decryptedProgress = CryptoJS.AES.decrypt(
        sessionStorage.getItem("progress"),
        `${process.env.NEXT_PUBLIC_SECRET_KEY}`
      ).toString(CryptoJS.enc.Utf8);

      setProgress(parseInt(decryptedProgress));
    }
  }, []);

  const value = useMemo(() => ({ progress, setProgress }), [progress]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressBarContext;
