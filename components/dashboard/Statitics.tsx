import { Card } from "@mui/material";
import VisaCard from "./VisaCard";
import { BsMailbox2 } from "react-icons/bs";
import Link from "next/link";

import { User } from "../../types/user";

interface Props {
  readonly user: User;
}

function Statitics({ user }: Props) {
  function hideDigits(cardNumber) {
    var hiddenDigits = cardNumber.slice(0, -4).replace(/\d/g, "*");
    var visibleDigits = cardNumber.slice(-4);
    return hiddenDigits + visibleDigits;
  }

  return (
    <Card
      variant="outlined"
      className="pb-10 pt-6 px-3 md:px-6 space-y-6 w-full"
    >
      {user.cards && user.cards.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4 space-x-2">
            <div>
              <h1 className="font-semibold text-md md:text-xl">My Cards</h1>
            </div>
            <Card variant="outlined">
              <Link href="/secure/transactions">
                <span className="flex items-center space-x-4 py-2 px-2">
                  <BsMailbox2 className="" />
                  <span className="text-xs text-right">E-Statement</span>
                </span>
              </Link>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-20">
            {user.cards.map((card) => (
              <div key={card.uid}>
                <VisaCard
                  color="#1f2937"
                  cardno={hideDigits(card.cardNumber) || "1090612-242-XXX"}
                  holdername={card.cardName}
                  expiringdate={new Date(card.cardExpiry).toLocaleDateString(
                    "en-US",
                    {
                      month: "2-digit",
                      year: "2-digit",
                    }
                  )}
                  cvv={906}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="overflow-scroll">
        <h1 className="font-semibold text-md md:text-xl mb-3">
          Market Overview
        </h1>
        <iframe
          className=""
          style={{ width: "100%", height: "480px" }}
          name="ForexWidget"
          src="https://darqube.com/external-embedding/forex-widget?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aWRnZXQiOnsiZGVmYXVsdHMiOlsiUG9wdWxhciIsIk1ham9yIiwiTWlub3IiXSwiY3VzdG9tcyI6e319LCJ3X3R5cGUiOiJGb3JleFdpZGdldCIsImZlX2NmZyI6eyJjbW9kZSI6MCwiZmNsciI6InJnYmEoMjU1LCAyNTUsIDI1NSwgMSkiLCJiZyI6InJnYmEoMjEsIDI1LCAzMCwgMSkiLCJoIjo0ODAsInciOjkwMCwiYXN6IjpmYWxzZSwibG5nIjoiZW4iLCJoZGljbiI6ZmFsc2UsInd0bVYiOnsidHlwZSI6IkRhcnF1YmUiLCJlbmFibGVkIjp0cnVlfX0sImV4cCI6MTY3MDQ1OTc2MSwic3ViIjoiYWNjZXNzIn0.jvwCssu7nDlLHRKSu1QfmWfa9AcAhk-N7RuEuQoq8GI"
          id="ForexWidget"
        ></iframe>
      </div>
    </Card>
  );
}

export default Statitics;
