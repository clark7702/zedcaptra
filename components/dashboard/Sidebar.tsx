import NestedList from "../general/NestedList";
import { User } from "../../types/user";

interface SidebarProps {
  user: User;
}

function Sidebar({ user }: Readonly<SidebarProps>) {
  return <NestedList user={user} />;
}

export default Sidebar;
