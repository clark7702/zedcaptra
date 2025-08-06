"use server";

import client from "../helpers/sanity";
import { auth, signOut } from "../auth";
import { User } from "../types/user";
import { formattedDate } from "../helpers/snippets";
import { Transaction, UserIPLocation } from "../types";
import { revalidatePath } from "next/cache";
import { sendTransactionEmail } from "./mail";

export async function LoginUser({ email, password }) {
  const response = await client.fetch(
    `*[_type == "accounts" && email == "${email}"]`
  );

  if (response.length > 0) {
    const user = response[0];

    if (user.password !== password) {
      return Promise.reject("Invalid Credentials");
    }

    return Promise.resolve(user);
  }

  return Promise.resolve(null);
}

export async function SignUpUser(user: User) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/user/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return {
      message: "An error occured",
      status: 400,
    };
  }
}

export async function fetchUser(userId: string) {
  if (!userId) {
    throw new Error("userId is undefined");
  }

  return await client.fetch(
    `*[_type == 'accounts' && email == "${userId}"]{
          "imageUrl": photo.asset->url,
          "statements": *[_type == "statements" && references(^._id) && !(_id in path("drafts.**"))],
          "cards": *[_type == "cards" && references(^._id)],
          ...,
        }`,
    { userId }
  );
}

export async function getUser(): Promise<User | null> {
  try {
    const session = await auth();

    if (!session) return null;

    const user = await fetchUser(session?.user?.email as string);

    return user[0];
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function createTransaction({
  transaction,
  user,
}: {
  transaction: Transaction;
  user: User;
}) {
  return await client.create({
    _type: "statements",
    _id: transaction.uuid,
    amount: parseInt(transaction.amount),
    transactionDate: formattedDate(new Date()),
    transactionType: "debit",
    currency: transaction.currency,
    country: transaction.country,
    accountNumber: parseInt(transaction.accountNumber),
    routingNumber: parseInt(transaction.routingNumber),
    bankName: transaction.beneficiaryBankName,
    bankAddress: transaction.bankAddress,
    beneficiaryName: transaction.beneficiaryName,
    beneficiaryAddress: transaction.beneficiaryAddress,
    naration: transaction.naration,
    swiftCode: transaction.swiftCode,
    account: {
      _type: "reference",
      _ref: user._id,
    },
  });
}

export async function postTransaction(
  transaction: Transaction,
  user: User
): Promise<{ message: string; status: number }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transaction/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction,
        user,
      }),
    }
  );

  const data = await response.json();

  return data;
}

export async function updateUserBalance(transaction: {
  account: { _ref: string };
  amount: string;
  transactionType: string;
}) {
  try {
    const userInfo = await client.fetch(
      `*[_type == 'accounts' && _id == "${transaction.account._ref}"]{
      ...,
    }`,

      {}
    );

    if (userInfo.length > 0) {
      const user = userInfo[0];

      if (transaction.transactionType === "debit") {
        const result = await client
          .patch(user._id)
          .set({
            ledgerBalance:
              parseInt(user.ledgerBalance) - parseInt(transaction.amount),
            availableBalance:
              parseInt(user.availableBalance) - parseInt(transaction.amount),
          })
          .commit();

        return result;
      } else if (transaction.transactionType === "credit") {
        const result = await client
          .patch(user._id)
          .set({
            ledgerBalance:
              parseInt(user.ledgerBalance) + parseInt(transaction.amount),
            availableBalance:
              parseInt(user.availableBalance) + parseInt(transaction.amount),
          })
          .commit();

        return result;
      }

      revalidatePath("/secure/dashboard");
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error, "error");
    return error;
  }
}

const apiKey = "534e57cacefbf45ec9306b5eb1d4a348";

export async function convertCurrency(
  amount: number,
  toCurrency: string
): Promise<number> {
  const fromCurrency = "USD";
  try {
    // Fetch the current exchange rates
    const response = await fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`
    );

    const data = await response.json();

    console.log(data, "data");
    //   const rates = response.data.rates;

    // Find the exchange rate for the toCurrency
    //   const exchangeRate = rates[toCurrency];

    // Convert the amount to the toCurrency
    //   const convertedAmount = amount * exchangeRate;

    return 0;
  } catch (error) {
    console.error("Error converting currency:", error);
    throw error;
  }
}

export async function changePassword(password: string, user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}admin/user/changepassword`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        id: user._id,
      }),
    }
  );

  const res = await response.json();

  return res;
}

// export async function postTransaction(
//   transaction: Transaction,
//   user: User
// ): Promise<{ message: string; status: number }> {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/transaction/create`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         transaction,
//         user,
//       }),
//     }
//   );

//   const data = await response.json();

//   return data;
// }

/**
 * Logs out the user.
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */
export async function logOut() {
  return await signOut({
    redirectTo: "/",
  });
}

export async function getUserIP(): Promise<UserIPLocation | null> {
  try {
    const response = await fetch("https://ipwho.is/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting user IP:", error);
    return null;
  }
}
