import VerifyCard from "../../../../components/payment/Verify";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

// export const runtime = "edge";

async function Verify() {
  const user = await getUser();

  return (
    <div className='sm:w-3/4 sm:mx-auto lg:w-1/2 my-14 mx-4'>
      <VerifyCard user={user as User} />
    </div>
  );
}

export default Verify;
