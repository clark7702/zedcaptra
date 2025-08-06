import { countries, currencies } from "../../../utils/data";

const schema = {
  name: "statements",
  title: "Statements",
  type: "document",
  fields: [
    {
      name: "account",
      title: "Account",
      type: "reference",
      to: [{ type: "accounts" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "transactionType",
      title: "Transaction Type",
      type: "string",
      options: {
        list: [
          { title: "Debit", value: "debit" },
          { title: "Credit", value: "credit" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "transactionDate",
      title: "Transaction Date",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [...currencies],
      },
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      options: {
        list: [...countries],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "accountNumber",
      title: "Account Number",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "routingNumber",
      title: "Routing Number",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "beneficiaryName",
      title: "Beneficiary Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "beneficiaryAddress",
      title: "Beneficiary Address",
      type: "string",
    },
    {
      name: "bankName",
      title: "Bank Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bankAddress",
      title: "Bank Address",
      type: "string",
    },
    {
      name: "swiftCode",
      title: "IBAN / Swift",
      type: "string",
    },
    {
      name: "naration",
      title: "Narration / Description",
      type: "string",
    },
  ],
};

export default schema;
