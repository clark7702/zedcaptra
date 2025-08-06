const schema = {
  name: "cards",
  title: "Cards",
  type: "document",
  fields: [
    {
      name: "account",
      title: "Account",
      type: "reference",
      to: [{ type: "accounts" }],
    },
    {
      name: "cardNumber",
      title: "Card Number",
      type: "string",
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "cardType",
      title: "Card Type",
      type: "string",
      options: {
        list: [
          { title: "Visa", value: "visa" },
          { title: "Mastercard", value: "mastercard" },
          { title: "American Express", value: "amex" },
        ],
      },
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "cardName",
      title: "Card Name",
      type: "string",
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "cardExpiry",
      title: "Card Expiry",
      type: "string",
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "cardCvv",
      title: "Card CVV",
      type: "string",
      // validation: (Rule) => Rule.required(),
    },
  ],
};

export default schema;
