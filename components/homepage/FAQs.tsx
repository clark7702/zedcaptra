"use client";

import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FaqAccordion from "./FaqAccordion";
import faqsimg from "../../assets/images/FAQs.svg";
import { FaQuestionCircle } from 'react-icons/fa';

const FAQs = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="faqs"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: 1,
              display: 'block',
              mb: 1.5,
            }}
          >
            NEED HELP?
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Find answers to common questions about our services, accounts, and more.
            Can't find what you're looking for? Our support team is here to help.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 8 },
            alignItems: 'flex-start',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              height: '100%',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                mx: 'auto',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0) 70%)',
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                },
              }}
            >
              <Image
                src={faqsimg}
                alt="Frequently Asked Questions"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
            
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: '12px',
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                textAlign: 'center',
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              <FaQuestionCircle size={32} style={{ marginBottom: '12px' }} />
              <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                Still have questions?
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Our customer support team is available 24/7 to assist you with any inquiries.
              </Typography>
              <Box
                component="a"
                href="/contact"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Contact Support
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: '8px' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaqAccordion />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQs;
