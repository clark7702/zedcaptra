"use client";
import { capitalizeFirstLetter } from "../../helpers/snippets";
import { User } from "../../types/user";

// function greeting to return the greeting based on the time of the day
function greetUser(name: string) {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Good Afternoon";
  } else {
    timeOfDay = "Good Evening";
  }

  return `${timeOfDay} ${capitalizeFirstLetter(name)}`;
}

function UserGreeting({ user }: { user: User }) {
  return (
    <div className="flex justify-between py-4 space-x-8 items-start">
      <h1 className="text-sm md:text-lg font-semibold">
        {greetUser(`${user?.firstName || ""}`)},
      </h1>
      {/* <h1 className="text-sm text-right md:text-lg font-semibold">
        Last Updated: {timeAgo.format(new Date(user?.lastLogin) || new Date())}
      </h1> */}
    </div>
  );
}

export default UserGreeting;
