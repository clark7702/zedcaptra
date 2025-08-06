"use client";;
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { User } from "../../types/user";

function capitalizeWords(text) {
  return text?.replace(/(?:^|\s)\S/g, (res) => {
    return res.toUpperCase();
  });
}

const dollarUSLocale = Intl.NumberFormat("en-US");

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({
  children,
  value,
  index,
  ...other
}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface Props {
  readonly user: User;
}

export default function FullWidthTabs({ user }: Props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [inTransaction, setInTransaction] = React.useState([]);
  const [outTransaction, setOutTransaction] = React.useState([]);

  const dollarUSLocale = Intl.NumberFormat("en-US");
  const dollarIndianLocale = Intl.NumberFormat("en-IN");

  const inTransactions = React.useMemo(() => {
    return user.statements.filter(
      (statement) => statement.transactionType === "credit"
    );
  }, [user]);

  const outTransactions = React.useMemo(() => {
    return user.statements.filter(
      (statement) => statement.transactionType === "debit"
    );
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="In" {...a11yProps(0)} />
          <Tab label="Out" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {inTransactions?.length > 0 ? (
          inTransactions?.slice(0, 4).map((transaction) => {
            return (
              <div
                key={transaction._id}
                className="flex justify-between items-center mb-5"
              >
                <div className="">
                  <h1 className="font-semibold">
                    {capitalizeWords(transaction?.beneficiaryName)}
                  </h1>
                  <p className="text-xs text-slate-500">
                    {new Date(
                      transaction?.transactionDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h1 className={`text-green-500`}>{`${
                    transaction?.currency
                  }${dollarUSLocale.format(transaction?.amount)}`}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            {" "}
            <h1>No recent transaction</h1>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {outTransactions?.length > 0 ? (
          outTransactions?.slice(0, 4).map((transaction) => {
            return (
              <div
                key={transaction._id}
                className="flex justify-between items-center mb-5"
              >
                <div className="">
                  <h1 className="font-semibold">
                    {capitalizeWords(transaction?.beneficiaryName)}
                  </h1>
                  <p className="text-xs text-slate-500">
                    {new Date(
                      transaction?.transactionDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h1 className={`text-red-500`}>{`${
                    transaction?.currency
                  }${dollarUSLocale.format(transaction?.amount)}`}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            {" "}
            <h1>No recent transaction</h1>
          </div>
        )}
      </TabPanel>
    </Box>
  );
}
