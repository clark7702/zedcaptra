import StatementCard from "../../../components/e-statement/StatementCard";

import { getUser } from "../../../lib/actions";
import { User } from "../../../types/user";
// export const runtime = "edge";

async function E_Statement() {
  const user = await getUser();

  return (
    <div className='sm:w-3/4 mx-4 my-12 sm:mx-auto'>
      <StatementCard user={user as User} />
    </div>
  );
}

export default E_Statement;
