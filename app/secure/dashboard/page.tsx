import TickerTape from "@/components/dashboard/TickerTape";
import Wrapper from "../../../components/dashboard/Wrapper";
import { getUser } from "../../../lib/actions";
import { User } from "../../../types/user";

export const dynamic = "force-dynamic";

async function page() {
  const user = await getUser();

  return (
    <div className="pb-6 md:pb-10">
      <TickerTape />
      <div className="sm:px-8 px-5 ">
        <Wrapper user={user as User} />
      </div>
    </div>
  );
}

export default page;
