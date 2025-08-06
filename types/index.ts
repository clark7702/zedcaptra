export type Transaction = {
  transferType: "wire transfer" | "domestic";
  payment: "international";
  bank_name: string;
  country: string;
  uuid: string;
  amount: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  accountNumber: string;
  beneficiaryBankName: string;
  bankAddress: string;
  swiftCode: string;
  routingNumber: string;
  currency: string;
  naration: string;
  date: string;
};

export interface UserIPLocation {
  ip: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  connection: {
    isp: string;
  };
}

export interface ContactUsMessage {
  topic: string;
  subject: string;
  message: string;
}

export interface Email {
  to: string;
  from: string;
  subject: string;
  htmlBody: string;
}
