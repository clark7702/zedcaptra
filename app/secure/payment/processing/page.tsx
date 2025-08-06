import ProcessingCard from "../../../../components/payment/ProcessingCard";

import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

async function Processing() {
  const user = await getUser();

  return (
    <div className="md:w-3/4 md:mx-auto px-5 md:px-1 xl:w-1/2 mt-28 mb-28 md:my-20">
      <ProcessingCard user={user as User} />
    </div>
  );
}

export default Processing;
