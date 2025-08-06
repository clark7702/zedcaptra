import { Card, Container } from "@mui/material";
import CustomButton from "../../../components/general/Button";

import logoimg from "../../../assets/brand/logo.png";

import { bankEmail } from "../../../constants/Settings";
import Link from "next/link";
import Image from "next/image";

function Submitted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Container maxWidth={"md"}>
        <div className="text-cente flex justify-center mb-6 lg:mb-10">
          <Link href={"/"}>
            <span>
              <Image
                src={logoimg}
                alt="logo"
                className="object-cover w-44 h-auto"
                priority
              />
            </span>
          </Link>
        </div>
        <Card
          sx={{
            borderRadius: 2,
          }}
          variant="elevation"
          className="p-6 sm:p-10 lg:p-12 xl:p-14 space-y-6 lg:space-y-10 flex flex-col items-center"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-center leading-relaxed mb-2">
            Application Submitted and Awaiting Approval
          </h1>

          <div className=" space-y-4 lg:space-y-5 leading-relaxed">
            <p className="">
              <span className="font-bold">
                Thank you for submitting your application!
              </span>{" "}
              Our team is currently reviewing your application and will get back
              to you as soon as possible. Please note that it may take up to
              several business days for us to review your application.
            </p>

            <p className="">
              In the meantime, please do not resubmit your application or make
              any changes to your submitted information. If you need to make any
              updates or changes to your application, please contact our support
              team at <span className="text-green-600">{bankEmail}</span>.
            </p>
          </div>

          <Link href={"/auth/signin"}>
            <CustomButton text={"Go to Login"} />
          </Link>
        </Card>
      </Container>
    </div>
  );
}

export default Submitted;
