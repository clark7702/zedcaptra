import {
  BsCreditCard,
  BsFillHouseFill,
  BsFillFileEarmarkPersonFill,
} from "react-icons/bs";
import { AiOutlineMobile } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineSavings } from "react-icons/md";

const features = [
  {
    name: "Personal Banking Services",
    description:
      "We offer a variety of personal banking services to help you manage your money with ease. Our services include savings accounts, checking accounts, and personal loans. Our savings accounts offer competitive interest rates, and our checking accounts come with a range of features, including bill pay.",
    icon: BsFillFileEarmarkPersonFill,
    id: "personal-banking",
  },
  {
    name: "Credit and Debit Cards",
    description:
      "Our bank offers a range of credit and debit card services to meet your needs. Our credit cards offer competitive interest rates, rewards, and cash back programs, and our debit cards come with a range of features, including chip technology, fraud monitoring, and zero-liability protection.",
    icon: BsCreditCard,
    id: "cards",
  },
  {
    name: "Online Banking",
    description:
      "We understand the importance of convenience in today's fast-paced world. That's why we offer online banking services that allow you to manage your finances from anywhere, at any time. ",
    icon: AiOutlineMobile,
    id: "online-banking",
  },
  {
    name: "Commercial Banking Services",
    description:
      "We also offer commercial banking services to help businesses manage their finances effectively. Our commercial banking services include business checking accounts, merchant services, and business loans.",
    icon: HiOutlineOfficeBuilding,
    id: "commercial-banking",
  },
  {
    name: "Investment Management",
    description:
      "We offer a variety of investment management services to help you grow your wealth. Our investment management services include retirement planning, estate planning, and wealth management.",
    icon: MdOutlineSavings,
    id: "investment-management",
  },
  {
    name: "Mortgages",
    description:
      "We offer a variety of mortgage services to help you buy a home. Our mortgage services include home equity loans, home equity lines of credit, and mortgage refinancing.",
    icon: BsFillHouseFill,
    id: "mortgages",
  },
];

export default function Example() {
  return (
    <div id='whatweoffers' className=' py-8'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-lg font-semibold leading-7 text-green-600 dark:text-green-800'>
            What we offers
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-green-600 dark:text-green-800 sm:text-4xl'>
            We offer a wide range of financial products and services
          </p>
          <p className='mt-6 text-lg leading-8 dark:text-gray-600'>
            We are committed to providing our customers with a range of
            financial services that meet their banking needs. From personal
            banking to commercial banking, we have you covered. Our services are
            designed to help you manage your finances effectively and
            efficiently.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
          <dl className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {features.map((feature) => (
              <div
                id={feature.id}
                key={feature.name}
                className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 dark:text-gray-900'>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
                    <feature.icon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className='mt-2 text-base leading-7 dark:text-gray-600'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
