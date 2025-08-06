"use client";

import { capitalizeFirstLetter } from "@/helpers/snippets";
import { User } from "@/types/user";

function BottomBar({ user }: { user: User }) {
  return (
    <div>
      <h1 className="font-medium">
        {capitalizeFirstLetter(user.accountType)} : Account Number:{" "}
        {user.accountNumber}
      </h1>
    </div>
  );
}

export default BottomBar;
