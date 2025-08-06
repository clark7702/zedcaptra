"use client";

import { Box, Container, Typography, Grid, Button, useTheme } from '@mui/material';
import { motion } from "motion/react";
import Image from 'next/image';
import Link from 'next/link';
import { FaMoneyBillTransfer, FaMobileScreen, FaClock, FaArrowRight } from 'react-icons/fa6';

const moneyFeatures = [
  {
    icon: <FaMoneyBillTransfer size={32} />,
    image: "/images/move-money-1.jpg",
    title: "Seamless Transfers",
    description: "Move money between accounts instantly with zero fees, 24/7",
    link: "/transfers"
  },
  {
    icon: <FaMobileScreen size={32} />,
    image: "/images/move-money-2.jpg",
    title: "Mobile Check Deposit",
    description: "Deposit checks anytime, anywhere with our mobile app",
    link: "/mobile-banking"
  },
  {
    icon: <FaClock size={32} />,
    image: "/images/move-money-3.jpg",
    title: "Bill Pay & Scheduling",
    description: "Automate your payments and never miss a due date again",
    link: "/bill-pay"
  }
];

const MoveMoneyCard = ({ icon, image, title, description, link, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    style={{ height: '100%' }}
  >
    <Box
      component={Link}
      href={link}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
          '& .feature-image': {
            transform: 'scale(1.05)',
          },
          '& .feature-arrow': {
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="feature-image"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          }}
        >
          {icon}
        </Box>
      </Box>
      
      <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3,
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
          className="feature-arrow"
        >
          Learn more
          <FaArrowRight style={{ marginLeft: '8px', transition: 'transform 0.3s ease' }} />
        </Box>
      </Box>
    </Box>
  </motion.div>
);

const MoveMoney = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
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
            FINANCIAL FREEDOM
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
            Move Money on Your Terms
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Experience seamless transactions with our comprehensive suite of money movement solutions
            designed for the modern financial landscape.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {moneyFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MoveMoneyCard {...feature} index={index} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<FaArrowRight />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                borderColor: 'primary.main',
              },
            }}
          >
            View All Money Movement Options
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MoveMoney;
