"use client";

import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUserFriends, FaGlobeAmericas, FaStar, FaShieldAlt } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUserFriends size={32} />,
    value: "1M+",
    label: "Satisfied Customers",
    description: "Trusted by over a million users worldwide"
  },
  {
    icon: <FaGlobeAmericas size={32} />,
    value: "25+",
    label: "Global Markets",
    description: "Serving clients across multiple countries"
  },
  {
    icon: <FaStar size={32} />,
    value: "4.9",
    label: "Star Rating",
    description: "Rated by thousands of satisfied customers"
  },
  {
    icon: <FaShieldAlt size={32} />,
    value: "100%",
    label: "Secure",
    description: "Bank-level security for all transactions"
  }
];

const AnimatedCounter = ({ value }: { value: string }) => {
  // Remove any non-numeric characters and the plus sign for the animation
  const numericValue = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(numericValue, '');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {numericValue}
      </motion.span>
      {suffix && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {suffix}
        </motion.span>
      )}
    </motion.div>
  );
};

const StatsCard = ({ icon, value, label, description, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: '16px',
          bgcolor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', sm: '3rem' },
            lineHeight: 1.1,
          }}
        >
          <AnimatedCounter value={value} />
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: 'text.primary',
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: '280px',
            mx: 'auto',
            fontSize: '0.95rem',
          }}
        >
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
};

const Customers = () => {
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
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
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
            OUR REACH
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
            Trusted by Clients Worldwide
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Join millions of customers who trust us with their financial needs
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard {...stat} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Customers;
