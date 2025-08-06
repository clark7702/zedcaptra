import { Metadata } from "next";
import React from "react";
import { getUser, logOut } from "../../lib/actions";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { redirect } from "next/navigation";

// export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUser();
  return {
    title: `${user?.firstName} ${user?.lastName} | Customer Portal`,
  };
}

async function Layout({ children }: { readonly children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col lg:flex-row relative h-screen overflow-clip">
      <div className="hidden lg:block border h-full">
        <Sidebar user={user} />
      </div>
      <div className="flex-1">
        <Header user={user} />
        <div className="h-[90vh] overflow-auto">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
