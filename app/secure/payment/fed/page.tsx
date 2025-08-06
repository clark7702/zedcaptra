import React from "react";
import { getUser } from "../../../../lib/actions";
import ProgressBarContext from "../../../../context/ProgressBarContext";
import FEDCode from "../../../../components/payment/Fed";
import { User } from "../../../../types/user";

async function page() {
  const user = await getUser();

  return (
    <ProgressBarContext>
      <div className="sm:w-3/4 sm:mx-auto lg:w-1/2 my-14 mx-4">
        <FEDCode user={user as User} />
      </div>
    </ProgressBarContext>
  );
}

export default page;
