import PinForm from "../../../components/login/Pin";
import { getUser } from "../../../lib/actions";
import { User } from "../../../types/user";

import imgSrc from "../../../assets/images/man-carrying-son.jpeg";
import Image from "next/image";

// export const runtime = "edge";

async function Pin() {
  const user = await getUser();

  console.log(user, "user in pin verification");

  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={imgSrc} fill alt="man holding a child" />
      </div>
      <PinForm user={user as User} />
    </main>
  );
}

export default Pin;
