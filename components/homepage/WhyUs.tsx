import React from "react";
import { AiOutlineSafety } from "react-icons/ai";

const data = [
  {
    title: "Safe & Secure",
    description:
      "We use the latest technology to ensure your data is safe and secure.",
    icon: <AiOutlineSafety />,
  },
  {
    title: "Licensed & Regulated",
    description:
      "Bank with confidence, knowing our operations are fully regulated.",
    icon: <AiOutlineSafety />,
  },
  {
    title: "Protected Funds",
    description:
      "We are a full reserve bank. 100% of your funds are kept in the bank ​at all times.",
    icon: <AiOutlineSafety />,
  },
];

function WhyUs() {
  return (
    <div className="">
      <div>
        <h1 className="text-4xl font-bold text-center text-primary py-10">
          Why Bank with Us?
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {data.map((item, index) => (
          <div
            className={
              index === 2
                ? "col-span-full lg:col-span-1 self-center flex flex-col items-center text-center justify-center space-y-3"
                : "flex flex-col items-center text-center justify-center space-y-3"
            }
            key={index}
          >
            <div className="flex items-center justify-center border border-primary hover:bg-primary hover:text-white cursor-pointer rounded-full w-16 h-16">
              {item.icon}
            </div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="text-center text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
