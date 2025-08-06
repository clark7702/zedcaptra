import { redirect } from "next/navigation";
import SignInForm from "../../../components/login/SignInForm";
import { getUser } from "../../../lib/actions";

import logoImage from "../../../assets/brand/logo.png";
import { Suspense } from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { DEFAULT_LOGIN_REDIRECT_URL } from "../../../lib/consts";
import Link from "next/link";

export default async function SignIn() {
  const user = await getUser();

  if (user) redirect(DEFAULT_LOGIN_REDIRECT_URL);

  return (
    <main className="h-screen grid grid-cols-1">
      <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-6">
        <div className="mb-5">
          <Link href={`/`}>
            <Image src={logoImage} alt="logo" height={50} width={250} />
          </Link>
        </div>
        <Suspense
          fallback={<Skeleton variant="rounded" width={400} height={300} />}
        >
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
