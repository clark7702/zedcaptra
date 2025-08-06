import { Box, Container, Grid, Button } from '@mui/material';
import { Home, DirectionsCar, School, Build } from '@mui/icons-material';
import HeroImage from '@/components/banking/HeroImage';
import FeatureCard from '@/components/banking/FeatureCard';

const loanTypes = [
  {
    icon: <Home sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Home Loans',
    description: 'Competitive mortgage rates for buying or refinancing your home.'
  },
  {
    icon: <DirectionsCar sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Auto Loans',
    description: 'Great rates on new or used vehicle financing.'
  },
  {
    icon: <School sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Education Loans',
    description: 'Invest in your future with our education financing options.'
  },
  {
    icon: <Build sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Home Equity',
    description: 'Unlock the value of your home for major expenses.'
  }
];

export default function LoansAndMortgages() {
  return (
    <Box>
      <HeroImage
        src="/images/banking/loans.jpg"
        title="Loans & Mortgages"
        subtitle="Competitive rates and flexible terms for all your borrowing needs"
        ctaText="Apply Now"
        secondaryCtaText="Check Rates"
        alt="Loans and Mortgages"
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {loanTypes.map((loan, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...loan} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Button variant="contained" size="large">
            View All Loan Options
          </Button>
        </Box>
      </Container>
    </Box>
  );
}