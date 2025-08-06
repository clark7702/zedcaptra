import TaxCode from "../../../../components/payment/Tax";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

async function MAA() {
  const user = await getUser();

  return (
    <div className="sm:w-3/4 sm:mx-auto lg:w-1/2 my-14">
      <TaxCode user={user as User} />
    </div>
  );
}

export default MAA;
