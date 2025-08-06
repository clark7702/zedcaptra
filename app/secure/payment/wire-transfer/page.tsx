import WireTransfer from "../../../../components/payment/WireTransfer";

import { getUser } from "../../../../lib/actions";
// export const runtime = "edge";

async function Wiretransfer() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="sm:w-3/4 mx-auto my-12">
      <WireTransfer user={user} />
    </div>
  );
}

export default Wiretransfer;
