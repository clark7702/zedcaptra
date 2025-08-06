"use client";
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { motion } from "motion/react";
import Link from 'next/link';
import { IconType } from 'react-icons';
import { 
  FaCreditCard, 
  FaPiggyBank, 
  FaHome, 
  FaBuilding, 
  FaChartLine, 
  FaExchangeAlt,
  FaShieldAlt,
  FaGlobe
} from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const services = [
  {
    icon: <FaCreditCard size={32} />,
    title: 'Premium Cards',
    description: 'Exclusive credit and debit cards with premium benefits and rewards',
    link: '/services/cards',
  },
  {
    icon: <FaPiggyBank size={32} />,
    title: 'Savings',
    description: 'Competitive interest rates and flexible savings options',
    link: '/services/savings',
  },
  {
    icon: <FaHome size={32} />,
    title: 'Mortgages',
    description: 'Tailored home financing solutions for every need',
    link: '/services/mortgages',
  },
  {
    icon: <FaBuilding size={32} />,
    title: 'Business Banking',
    description: 'Comprehensive financial solutions for businesses of all sizes',
    link: '/business/banking',
  },
  {
    icon: <FaChartLine size={32} />,
    title: 'Investments',
    description: 'Expert wealth management and investment services',
    link: '/wealth/investments',
  },
  {
    icon: <FaExchangeAlt size={32} />,
    title: 'Global Transfers',
    description: 'Fast, secure international money transfers',
    link: '/services/transfers',
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: 'Insurance',
    description: 'Comprehensive protection for what matters most',
    link: '/services/insurance',
  },
  {
    icon: <FaGlobe size={32} />,
    title: 'Private Banking',
    description: 'Personalized banking for high-net-worth individuals',
    link: '/private-banking',
  },
];

const ServiceCard = ({ icon, title, description, link, delay }: ServiceCardProps) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <CardActionArea component={Link} href={link} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 4, height: '100%' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
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
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 2,
                minHeight: '48px',
              }}
            >
              {description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                '&:after': {
                  content: '"→"',
                  ml: 1,
                  transition: 'transform 0.3s ease',
                },
                '&:hover:after': {
                  transform: 'translateX(4px)',
                },
              }}
            >
              Learn more
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

const Services = () => {
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
            OUR SERVICES
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
            Comprehensive Financial Solutions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Discover a wide range of banking services designed to meet your personal and business needs with excellence and innovation.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <ServiceCard {...service} delay={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
