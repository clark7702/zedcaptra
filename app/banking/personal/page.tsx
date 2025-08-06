import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { 
  AccountBalance, 
  AccountBalanceWallet, 
  CreditCard, 
  RequestQuote,
  Payments,
  MobileFriendly
} from '@mui/icons-material';
import HeroImage from '@/components/banking/HeroImage';
import FeatureCard from '@/components/banking/FeatureCard';

const features = [
  {
    icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Checking Accounts',
    description: 'Flexible checking options with no hidden fees and easy access to your money.'
  },
  {
    icon: <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Savings Accounts',
    description: 'Grow your savings with competitive interest rates and no monthly fees.'
  },
  {
    icon: <CreditCard sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Credit Cards',
    description: 'Earn rewards on every purchase with our premium credit card options.'
  },
  {
    icon: <RequestQuote sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Personal Loans',
    description: 'Competitive rates for your personal financial needs.'
  },
  {
    icon: <Payments sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Mortgages',
    description: 'Find the perfect mortgage solution for your dream home.'
  },
  {
    icon: <MobileFriendly sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Mobile Banking',
    description: 'Bank on the go with our award-winning mobile app.'
  }
];

export default function PersonalBanking() {
  return (
    <Box>
      <HeroImage
        src="/images/banking/personal-banking.jpg"
        title="Personal Banking"
        subtitle="Smart banking solutions designed for your personal financial success"
        ctaText="Open an Account"
        secondaryCtaText="Learn More"
        alt="Personal Banking"
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Your Financial Journey Starts Here
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            We offer a comprehensive range of personal banking services to help you manage your money, save for the future, and achieve your financial goals.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
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
            Ready to get started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Join thousands of satisfied customers who trust us with their banking needs.
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
            Open an Account Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
}