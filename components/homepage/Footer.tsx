import { bankName } from "../../constants/Settings";
import Link from "next/link";

const year = new Date().getFullYear();

function Footer() {
  return (
    <div className='bg-slate-100 py-10 md:py-12 px-5 md:px-10 xl:px-40 flex flex-col space-y-10'>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
        <div className=''>
          <Link href={"/"}>
            <h1 className='text-primary font-semibold  mb-2'>HOME</h1>
          </Link>
          <Link href='/our-services'>Features</Link>
        </div>
        <div>
          <Link href={"/our-services"}>
            <h1 className='text-primary font-semibold  mb-2'>SERVICES</h1>
          </Link>
          <Link href={"/our-services"}>What We Offer</Link>
        </div>
        <div className='flex flex-col'>
          <Link href={"/auth/signin"}>
            {" "}
            <h1 className='text-primary font-semibold  mb-2'>ON THE GO</h1>
          </Link>
          <Link href={"/auth/signin"}>Mobile Banking</Link>
        </div>

        <div>
          <Link href={"/about-us"}>
            <h1 className='text-primary font-semibold  mb-2'>ABOUT US</h1>
          </Link>
          <div className='flex flex-col leading-relaxed'>
            <Link href={"/about-us#ourstory"}>Our Story</Link>
            <Link href={"/about-us#ourmission"}>Our Mission</Link>
          </div>
        </div>
      </div>

      <div>
        <p>
          <span className='text-primary font-bold'>©</span> {year} {bankName}.
          All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
