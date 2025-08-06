import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { 
  ShowChart, 
  AccountBalance, 
  Assessment, 
  Group,
  Security,
  TrendingUp
} from '@mui/icons-material';
import HeroImage from '@/components/banking/HeroImage';
import FeatureCard from '@/components/banking/FeatureCard';

const services = [
  {
    icon: <ShowChart sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Investment Management',
    description: 'Personalized investment strategies to grow and protect your wealth.'
  },
  {
    icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Retirement Planning',
    description: 'Comprehensive retirement planning for your golden years.'
  },
  {
    icon: <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Estate Planning',
    description: 'Secure your legacy with our expert estate planning services.'
  },
  {
    icon: <Group sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Private Banking',
    description: 'Exclusive banking services for high-net-worth individuals.'
  },
  {
    icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Trust Services',
    description: 'Professional trust management for your assets.'
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Wealth Planning',
    description: 'Strategic planning to grow and preserve your wealth.'
  }
];

export default function WealthManagement() {
  return (
    <Box>
      <HeroImage
        src="/images/banking/wealth-management.jpg"
        title="Wealth Management"
        subtitle="Personalized financial strategies to help you achieve your long-term goals"
        ctaText="Schedule a Consultation"
        secondaryCtaText="Learn More"
        alt="Wealth Management"
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Comprehensive Wealth Management
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Our experienced wealth advisors provide personalized financial planning and investment management services to help you navigate life's financial complexities.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...service} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 6, 
          borderRadius: 2,
          textAlign: 'center',
          mb: 8
        }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Start Planning Your Future Today
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Our wealth management team is ready to help you create a personalized financial plan.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ 
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Contact a Wealth Advisor
          </Button>
        </Box>
      </Container>
    </Box>
  );
}