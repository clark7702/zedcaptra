import AMLCode from "../../../../components/payment/Aml";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

async function AML() {
  const user = await getUser();

  return (
    <div className="sm:w-3/4 mx-auto lg:w-1/2 my-14">
      <AMLCode user={user as User} />
    </div>
  );
}

export default AML;
