import ChangePasswordComponent from "../../../../components/profile/ChangePassword";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

// export const runtime = "edge";

async function ChangePassword() {
  const user = await getUser();

  return (
    <div className='sm:w-3/4 my-14 mx-4 sm:mx-auto lg:w-1/2'>
      <ChangePasswordComponent user={user as User} />
    </div>
  );
}

export default ChangePassword;
