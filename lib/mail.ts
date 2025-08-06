import { bankEmail, bankName } from "../constants/Settings";

import { capitalizeFirstLetter, truncateString } from "../helpers/snippets";
import { User } from "../types/user";
import { ContactUsMessage, Email, Transaction, UserIPLocation } from "../types";
import { AppUrl, contactUs } from "./consts";
import axios from "axios";

const env = process?.env;
const dollarUSLocale = Intl.NumberFormat("en-US");

export const sendTransactionEmail = async (
  transaction: Transaction,
  user: User
) => {
  const formattedAmount = dollarUSLocale.format(parseInt(transaction?.amount));
  const avaliableBalance = dollarUSLocale.format(
    user.availableBalance - parseInt(transaction?.amount)
  );
  const hiddenaccountNumber = truncateString(transaction?.accountNumber, 6);

  try {
    // Email content
    const emailHtml = `
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Transaction Alert</title>
         <style>
             body {
                 font-family: Arial, sans-serif;
                 margin: 0;
                 padding: 0;
                 background-color: #f4f4f4;
             }
             .container {
                 max-width: 600px;
                 margin: 20px auto;
                 background-color: #ffffff;
                 padding: 20px;
                 border: 1px solid #e0e0e0;
                 border-radius: 5px;
             }
             .header {
                 background-color: #4CAF50;
                 color: #ffffff;
                 padding: 10px 0;
                 text-align: center;
                 border-radius: 5px 5px 0 0;
             }
             .content {
                 padding: 20px;
                 color: #333333;
             }
             .content p {
                 margin: 0 0 10px;
             }
             .content .transaction-details {
                 margin: 20px 0;
             }
             .content .transaction-details p {
                 margin: 10px 0;
             }
             .footer {
                 font-size: 12px;
                 color: #999999;
                 text-align: center;
                 padding: 10px 0;
                 border-top: 1px solid #e0e0e0;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <div class="header">
                 <h1>${bankName}</h1>
                 <h2>Successful Transaction</h2>
             </div>
             <div class="content">
                 <p>Dear ${capitalizeFirstLetter(
                   user?.firstName
                 )} ${capitalizeFirstLetter(user.lastName)},</p>
                 <p>We wish to inform you that a transaction occurred on your account with us.</p>
                 <div class="transaction-details">
                     <p><strong>Transaction Id:</strong> ${transaction.uuid}</p>
                     <p><strong>Transaction Date:</strong> ${
                       transaction.date
                     }</p>
                     <p><strong>Amount:</strong>${
                       transaction.currency
                     }${formattedAmount}</p>
                     <p><strong>Account Number:</strong> ${
                       transaction.accountNumber
                     }</p>
                     <p><strong>Beneficiary Name:</strong> ${
                       transaction.beneficiaryName
                     }</p>
                     <p><strong>Narration/Purpose:</strong> ${
                       transaction.naration
                     }</p>
                     <p><strong>Available Balance:</strong>${
                       user.currency
                     }${avaliableBalance}</p>
                 </div>
                 <p>If you didn't initiate this transfer, contact customer support immediately.</p>
                 <p style="font-size: 12px; color: #999999;">This email is intended for this recipient upon the terms and privacy policy of ${bankName}</p>
             </div>
             <div class="footer">
                 &copy;${new Date().getFullYear()} ${bankName}
             </div>
         </div>
     </body>
     </html>
     `;

    const templateParams: Email = {
      to: user?.email,
      from: `"${bankName}" <${bankEmail}>`,
      subject: `Debit Transaction Alert on ${hiddenaccountNumber}`,
      htmlBody: emailHtml,
    };

    await postEmail(templateParams);
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const sendOtpVerificationCode = async (
  code: number,
  user: User,
  transaction: Transaction
) => {
  const formattedAmount = dollarUSLocale.format(parseInt(transaction?.amount));

  // Email content
  const emailHtml = `
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
       <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
           <div style="text-align: center; padding: 10px 0; background-color: #4CAF50; color: #ffffff; border-radius: 5px 5px 0 0;">
               <h1 style="margin: 0;">${bankName}</h1>
           </div>
           <div style="padding: 20px; color: #333333;">
               <p>Hi ${user.firstName},</p>
               <p>You requested to make a transfer of ${
                 user.currency
               }${formattedAmount} to ${
                 transaction.accountNumber
               }. Kindly input this OTP code to proceed with your transfer:</p>
               <div style="font-size: 24px; font-weight: bold; color: #333333; text-align: center; padding: 10px; background-color: #f4f4f4; border-radius: 5px; margin: 20px 0;">
                   ${code}
               </div>
               <p>If you didn't initiate this transfer, contact customer support immediately.</p>
               <p style="font-size: 12px; color: #999999;">This email is intended for this recipient upon the terms and privacy policy of ${bankName}</p>
               <p style="text-align: center; font-size: 12px; color: #999999;">&copy;${new Date().getFullYear()} ${bankName}</p>
           </div>
       </div>
   </body>
   </html>
   `;
  try {
    const templateParams: Email = {
      to: user?.email,
      from: `"${bankName}" <${bankEmail}>`,
      subject: "OTP Verification Code",
      htmlBody: emailHtml,
    };

    return await postEmail(templateParams);
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const sendLoginNotification = async (
  user: User,
  userLocation: UserIPLocation
) => {
  try {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const emailHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recent Login Notification</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }
      .header h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
      }
      .content {
        padding: 20px;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        margin-bottom: 10px;
      }
      .content .info {
        font-size: 14px;
        color: #555;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #888;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        color: #fff !important;
        background-color: teal;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hi ${capitalizeFirstLetter(user?.firstName)},</h1>
        <h2>We noticed a recent login to your account.</h2>
      </div>
      <div class="content">
        <p><b>Time:</b> ${formattedDate}</p>
        <p><b>ISP:</b> ${userLocation.connection.isp}</p>
        <p><b>Location:</b> ${userLocation.region}, ${userLocation.country}</p>
        <p class="info">*Approximate geographic location based on IP address: ${
          userLocation.ip
        }</p>
        <p>If this was you, there's nothing else you need to do.</p>
        <p>If this wasn't you or if you have additional questions, please see our support page.</p>
        <a href="${AppUrl}" class="button">Learn More</a>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} | ${bankName}. | All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

    const templateParams: Email = {
      to: user?.email,
      from: `"${bankName}" <${bankEmail}>`,
      subject: "Recent Login Notification",
      htmlBody: emailHtml,
    };

    return await postEmail(templateParams);
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

const postEmail = async (templateParams: Email) => {
  try {
    const response = await axios.post(
      `${AppUrl}/api/email/send`,
      templateParams
    );

    return response.data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const sendContactUsEmail = async (
  user: User,
  message: ContactUsMessage
) => {
  try {
    const response = await axios.post(`${AppUrl}/api/email/send`, {
      to: contactUs,
      from: `"${bankName}" <${bankEmail}>`,
      subject: "Contact Us Message",
      htmlBody: `
        <h1>Contact Us Message</h1>
        <p> This is a message from ${user?.firstName} ${user?.lastName} with email ${user?.email}</p>
        <p> Message: ${message}</p>
      `,
    });

    return response.data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};
