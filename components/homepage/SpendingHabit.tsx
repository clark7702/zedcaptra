"use client";

import { Box, Container, Typography, Grid, Button, Stack, useTheme } from '@mui/material';
import { motion } from "motion/react"
import Image from 'next/image';
import img from "../../assets/images/STATISTICS.webp";
import { FiTrendingUp, FiPieChart, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

const features = [
  {
    icon: <FiTrendingUp size={24} />,
    title: "Real-time Tracking",
    description: "Monitor your spending as it happens with live updates"
  },
  {
    icon: <FiPieChart size={24} />,
    title: "Smart Categories",
    description: "Automatic categorization of all your transactions"
  },
  {
    icon: <FiDollarSign size={24} />,
    title: "Savings Goals",
    description: "Set and track progress toward your financial objectives"
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: "Detailed Reports",
    description: "Comprehensive insights into your spending patterns"
  }
];

const FeatureItem = ({ icon, title, description, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
  >
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'action.hover',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: '12px',
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const SpendingHabit = () => {
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
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
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
                FINANCIAL INSIGHTS
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Understand Your
                <Box component="span" sx={{ color: 'primary.main' }}> Spending Habits</Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                }}
              >
                Take control of your finances with our powerful insights. Our platform automatically categorizes your spending in real time, helping you track expenses, monitor costs, and identify savings opportunities.
              </Typography>
              
              <Box sx={{ mb: 5 }}>
                <Grid container spacing={2}>
                  {features.slice(0, 2).map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <FeatureItem {...feature} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large">
                  Start Tracking
                </Button>
                <Button variant="outlined" size="large">
                  Learn More
                </Button>
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid',
                borderColor: theme.palette.divider,
              }}
            >
              <Image
                src={img}
                alt="Financial Insights Dashboard"
                layout="responsive"
                width={800}
                height={600}
                quality={100}
                style={{
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                className="hover:scale-105"
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
            
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {features.slice(2).map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <FeatureItem {...feature} index={index + 2} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SpendingHabit;
