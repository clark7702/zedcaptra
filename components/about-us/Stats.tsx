const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "£4 million +" },
  { id: 2, name: "Assets under holding", value: "£9 Billion+" },
  { id: 3, name: "New users annually", value: "8,000+" },
];

export default function Example() {
  return (
    <div id="ourmission">
      <div className="bg-primary py-8 md:py-16 px-4 md:px-10 xl:px-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-8">
          <div className="space-y-6 md:col-span-6 md:max-w-2xl text-slate-100 dark:text-slate-300">
            <h1 className="text-3xl font-bold">Our mission</h1>

            <div className=" space-y-6 leading-relaxed">
              <p>
                Our mission is to deliver secure, innovative, and client-focused
                offshore banking services that empower individuals and
                businesses to protect and grow their wealth across borders.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <p className="font-bold text-lg">We are committed to:</p>
                <li>
                  Maintaining the highest standards of confidentiality and
                  compliance
                </li>
                <li>
                  Offering tailored financial solutions backed by expert
                  advisors
                </li>
                <li>
                  Leveraging technology and Swiss precision to simplify global
                  banking
                </li>
                <li>
                  Providing long-term asset protection, wealth planning, and
                  investment insights
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 text-center">
            <dl className="grid grid-cols-1 gap-y-12 md:gap-y-16 gap-x-8 ">
              {stats.map((stat) => (
                <div key={stat.id} className=" flex flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600 dark:text-slate-300">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-green-700 sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
