"use client";

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import { bankPhone, bankEmail, bankName } from "../../constants/Settings";

import { motion } from "motion/react"

const faqItems = [
  {
    question: `What is ${bankName} Routing Number?`,
    answer: `The routing number used for electronic transfers made by ACH (including Direct Deposit) and for domestic wire transfers (from another bank within the U.S.) is 0020649307. The routing number used for international wire transfers (from another bank outside the U.S.) is 049120492.`
  },
  {
    question: 'How do I send a wire transfer?',
    answer: `You can easily send a wire transfer via Online Banking. Login to Online Banking and select the "Payments" tab. Select "Send a Wire Transfer" and follow the prompts. You can also send a wire transfer by visiting any of our branches. Please bring a valid photo ID and the recipient's bank information. You can also call us at ${bankPhone} to send a wire transfer. Please have the recipient's bank information available.`
  },
  {
    question: 'What is a custodial Account?',
    answer: `A Custodial Account is an account that is maintained by an adult (Custodian) for the benefit of a minor. Note: We establish and maintain all custodial accounts under the Delaware Uniform Transfers to Minors Act.`
  },
  {
    question: 'What is the difference between a checking and savings account?',
    answer: 'A checking account is a transaction account that allows you to write a check or make a withdrawal from an ATM. A savings account is a deposit account that earns interest. You can make withdrawals from a savings account, but you are limited to six withdrawals per month.'
  },
  {
    question: 'How do I contact customer support?',
    answer: `You can reach our customer support team by calling ${bankPhone}, emailing ${bankEmail}, or visiting any of our branch locations during business hours. Our support team is available 24/7 to assist you with any questions or concerns.`
  },
  {
    question: 'Is my money insured?',
    answer: `Yes, ${bankName} is a member of the FDIC (Federal Deposit Insurance Corporation), which means your deposits are insured up to the maximum allowed by law. This insurance covers all deposit accounts, including checking, savings, money market deposit accounts, and certificates of deposit.`
  }
];

const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
    >
      <Accordion
        elevation={0}
        sx={{
          mb: 2,
          borderRadius: '12px !important',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            bgcolor: 'action.hover',
            '& .MuiAccordionSummary-root': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.div>
          }
          sx={{
            py: 2,
            px: 3,
            minHeight: '72px',
            '& .MuiAccordionSummary-content': {
              my: 'auto',
              '&.Mui-expanded': {
                my: 'auto',
              },
            },
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Typography 
            variant="subtitle1" 
            component="h3"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              pr: 2,
            }}
          >
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: 3,
            pt: 0,
            '&.MuiAccordionDetails-root': {
              paddingTop: 0,
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              '& a': {
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
};

const FaqAccordion = () => {
  return (
    <Box>
      <div className="mb-10 text-center md:text-left px-4">
        <h1 className="font-bold text-2xl text-green-700 mb-3">
          Frequently Asked Questions
        </h1>
        <p>What would you like to know about us?</p>
      </div>
      {faqItems.map((item, index) => (
        <FaqItem 
          key={index} 
          question={item.question} 
          answer={item.answer} 
          index={index} 
        />
      ))}
    </Box>
  );
};

export default FaqAccordion;
