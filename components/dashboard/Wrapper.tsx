import { User } from "../../types/user";
import AccountSummary from "./AccountSummary";
import BottomBar from "./BottomBar";
import PieChartComponent from "./PieChart";
import { QuickActions } from "./QuickActions";
import RealtimeChart from "./RealtimeChart";
import { RecentTransactions } from "./RecentTransactions";
import TransactionBarChart from "./TransactionBarChart";
import UserGreeting from "./UserGreeting";

interface WrapperProps {
  readonly user: User;
}

function Wrapper({ user }: WrapperProps) {
  return (
    <div className="relative space-y-6">
      <div className="">
        <UserGreeting user={user} />
        <BottomBar user={user} />
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AccountSummary user={user} />
        </div>
        <div className="">
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <TransactionBarChart user={user} />
        <PieChartComponent user={user} />
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <div>
          <RecentTransactions transactions={user.statements} />
        </div>
        <div className="lg:col-span-2">
          <RealtimeChart />
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
