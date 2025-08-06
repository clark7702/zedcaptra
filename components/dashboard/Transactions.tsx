import { Card } from "@mui/material";
import Link from "next/link";
import TransactionTab from "./Tabs";
import { User } from "../../types/user";

interface Props {
  user: User;
}

function Transactions({ user }: Props) {
  return (
    <Card variant='outlined' className='px-3 py-5'>
      <div className='flex justify-between items-cente mb-3'>
        <h1 className='font-bold text-md'>Transactions</h1>
        <Link
          href={`/secure/transactions`}
          className='hover:underline underline-offset-2'>
          <span>See all</span>
        </Link>
      </div>
      <TransactionTab user={user} />
    </Card>
  );
}

export default Transactions;
