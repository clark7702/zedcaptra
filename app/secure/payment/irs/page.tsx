import ProgressBarContext from "../../../../context/ProgressBarContext";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";
import IRSCode from "../../../../components/payment/Irs";

async function page() {
  const user = await getUser();

  return (
    <ProgressBarContext>
      <div className="sm:w-3/4 sm:mx-auto lg:w-1/2 my-14 mx-4">
        <IRSCode user={user as User} />
      </div>
    </ProgressBarContext>
  );
}

export default page;
