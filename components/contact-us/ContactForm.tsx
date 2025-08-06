"use client";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomInput from "../general/CustomInput";
import CustomButton from "../general/Button";
import CustomSelect from "../general/CustomSelect";
import CustomSnackBar from "../general/CustomSnackBars";

import { useForm } from "react-hook-form";
import { Severity } from "../general/CustomAlert";
import { sendContactUsEmail } from "../../lib/mail";
import { User } from "../../types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactUsMessage } from "../../types";

const messageOptions = [
  {
    title: "Account",
    value: "account",
  },

  {
    title: "Technical",
    value: "technical",
  },

  {
    title: "General",
    value: "general",
  },
  {
    title: "Others",
    value: "others",
  },
];

function ContactForm({ user }: { user: User }) {
  const [btnText, setBtnText] = useState("Submit Ticket");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<Severity>("success");

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      topic: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["sendcontactUsEmail"],
    mutationFn: async (message: ContactUsMessage) => {
      return await sendContactUsEmail(user, message);
    },
    onSuccess: () => {
      setSnackBarMessage(
        "We received your message, We will get back to you shortly"
      );
      setSnackBarSeverity("success");
      setOpenSnackBar(true);
    },
    onError: (error) => {
      console.log("error", error);
      setSnackBarMessage("An error occured, please try again later");
      setSnackBarSeverity("error");
      setOpenSnackBar(true);
    },
    onSettled: () => {
      setBtnText("Submit Ticket");
      reset();
    },
  });

  const onSubmit = (data) => {
    setBtnText("Please Wait...");
    mutate(data);
  };

  const isButtonDisabled =
    isLoading || btnText === "Please wait..." ? true : false;

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxWidth: "600px",
        }}
      >
        <Box
          sx={{
            height: 50,
          }}
          className="bg-primary flex items-center px-6 md:px-10 text-white"
        >
          <h1 className="text-base md:text-xl">Customer Support</h1>
        </Box>

        <Box className="px-6 py-10 md:px-10">
          <h1 className="mb-10">
            Do you have any Questions / Concerns? We will love to hear from you!
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div>
              <CustomSelect
                label="Select a Topic"
                name="topic"
                options={messageOptions}
                required={true}
                register={register}
              />
            </div>

            <div>
              <CustomInput
                label="Subject"
                name={"subject"}
                placeholder="Type your subject here..."
                required={true}
                register={register}
              />
            </div>

            <div>
              <CustomInput
                label="Message"
                name={"message"}
                multiline={true}
                required={true}
                placeholder="Type your message here..."
                rows={5}
                register={register}
              />
            </div>

            <div className="pt-3">
              <CustomButton
                text={btnText}
                disabled={isButtonDisabled}
                style={{
                  width: "50%",
                }}
              />
            </div>
          </form>
        </Box>
      </Card>

      <CustomSnackBar
        message={snackBarMessage}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        severity={snackBarSeverity}
      />
    </>
  );
}

export default ContactForm;
