import SettingsComponent from "../../../../components/profile/Settings";
import { getUser } from "../../../../lib/actions";
import { User } from "../../../../types/user";

// export const runtime = "edge";

async function Settings() {
  const user = await getUser();

  return (
    <div className="sm:w-3/4 my-14 mx-4 sm:mx-auto 2xl:w-1/2">
      <SettingsComponent user={user as User} />
    </div>
  );
}

export default Settings;
