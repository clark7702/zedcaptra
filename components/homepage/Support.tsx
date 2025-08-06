"use client";

import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeadset, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import supportImage from "../../assets/images/SupportChat-removebg-preview.png";

const supportItems = [
  {
    icon: <FaHeadset size={32} />,
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available around the clock to assist you with any questions or concerns.',
    action: 'Call Us',
    link: 'tel:+18005551234',
    color: 'primary.main'
  },
  {
    icon: <FaEnvelope size={28} />,
    title: 'Email Support',
    description: 'Send us an email and our team will respond to your inquiry within 24 hours.',
    action: 'Email Us',
    link: 'mailto:support@credoracapital.com',
    color: 'secondary.main'
  },
  {
    icon: <MdOutlineSupportAgent size={32} />,
    title: 'Live Chat',
    description: 'Chat with one of our support agents in real-time for immediate assistance.',
    action: 'Start Chat',
    link: '#chat',
    color: 'success.main'
  }
];

const Support = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="support"
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
              CUSTOMER SUPPORT
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
              We're Here to Help You
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
              Our multilingual support team is available around the clock to assist you in
              English, French, German, Spanish, and Italian. Reach out to us anytime.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {supportItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: '16px',
                    bgcolor: 'background.paper',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      bgcolor: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'text.primary',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    component="a"
                    href={item.link}
                    variant="outlined"
                    sx={{
                      alignSelf: 'flex-start',
                      color: item.color,
                      borderColor: item.color,
                      '&:hover': {
                        bgcolor: `${item.color}10`,
                        borderColor: item.color,
                      },
                    }}
                  >
                    {item.action}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: '16px',
            p: { xs: 4, md: 6 },
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ position: 'relative', maxWidth: '500px', mx: 'auto' }}>
              <Image
                src={supportImage}
                alt="Customer Support"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: 'text.primary',
              }}
            >
              Visit Our Branches
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <FaMapMarkerAlt style={{ color: theme.palette.primary.main, marginRight: '12px', marginTop: '4px' }} />
                <div>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>Headquarters</Typography>
                  <Typography variant="body1" color="text.secondary">
                    123 Financial District, New York, NY 10005, USA
                  </Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FaPhoneAlt style={{ color: theme.palette.primary.main, marginRight: '12px' }} />
                <Typography variant="body1" color="text.secondary">
                  +1 (800) 555-1234
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaClock style={{ color: theme.palette.primary.main, marginRight: '12px' }} />
                <Typography variant="body1" color="text.secondary">
                  Monday - Friday: 8:00 AM - 8:00 PM EST
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="large"
              href="/contact"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Find a Branch Near You
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Support;
