import { accountTypes, currencies } from "../../../utils/data";
import { defineType, defineField, defineArrayMember } from "sanity";

export const schema = defineType({
  name: "accounts",
  title: "Accounts",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: "password",
      title: "Password",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "middleName",
      title: "Middle Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "userName",
      title: "User Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accountNumber",
      title: "Account Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openingDate",
      title: "Opening Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [...currencies],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ledgerBalance",
      title: "Ledger Balance",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availableBalance",
      title: "Available Balance",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "stopTransfer",
      title: "Stop Transfer",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
    defineField({
      name: "amlCode",
      title: "AML Code",
      type: "string",
    }),
    defineField({
      name: "irsCode",
      title: "IRS Code",
      type: "string",
    }),
    defineField({
      name: "fedCode",
      title: "FED Code",
      type: "string",
    }),
    defineField({
      name: "imfCode",
      title: "IMF Code",
      type: "string",
    }),

    defineField({
      name: "taxCode",
      title: "TAX Code",
      type: "string",
    }),

    defineField({
      name: "accountStatus",
      title: "Account Status",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
          {
            title: "Suspended",
            value: "suspended",
          },
          { title: "Blocked", value: "blocked" },
          { title: "Pending", value: "pending" },
          { title: "Dormant", value: "dormant" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
          { title: "Other", value: "other" },
          {
            value: "Prefer not to say",
            title: "Prefer not to say",
          },
        ],
      },
    }),
    defineField({
      name: "authPin",
      title: "PIN",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accountType",
      title: "Account Type",
      type: "string",
      options: {
        list: [...accountTypes],
      },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "maritalStatus",
      title: "Marital Status",
      type: "string",
      options: {
        list: [
          { title: "Single", value: "single" },
          { title: "Married", value: "married" },
          { title: "Divorced", value: "divorced" },
          { title: "Widowed", value: "widowed" },
        ],
      },
    }),
    defineField({
      name: "occupation",
      title: "Occupation",
      type: "string",
    }),
  ],
});

export default schema;
