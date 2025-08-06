import DomesticTransfer from "../../../../components/payment/DomesticTransfer";

import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

// export const runtime = "edge";

async function Transfer() {
  const user = await getUser();

  return (
    <div className='sm:w-3/4 mx-auto my-12'>
      <DomesticTransfer user={user as User} />
    </div>
  );
}

export default Transfer;
