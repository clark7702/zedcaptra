"use client";
import { Card } from "@mui/material";
import ProgressBar from "../general/ProgressBar";

import ProgressBarContext from "../../context/ProgressBarContext";
import { useTypewriter } from "react-simple-typewriter";
import { User } from "../../types/user";

function ProcessingCard({ user }: { readonly user: User }) {
  const text = useTypewriter({
    words: [".."],
    loop: 0, // Infinite
    delaySpeed: 4000,
  });

  return (
    <div className="h-96">
      <Card variant="outlined" className="">
        <div className="py-14 px-6 flex text-center flex-col items-center space-y-6">
          <div className="px-3 md:px-10">
            <div className=" mb-5 flex items-end space-x-1 text-center justify-center">
              <h1 className="text-xl md:text-2xl font-semibold">
                Transaction Processing {text.text}
              </h1>
            </div>
            <p>
              Please wait while we process your transaction. This may take a few
              minutes.
            </p>
          </div>
          <ProgressBarContext>
            <ProgressBar user={user} />
          </ProgressBarContext>
        </div>
      </Card>
    </div>
  );
}

export default ProcessingCard;
