import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { 
  Business, 
  AccountBalance, 
  Receipt, 
  ShowChart,
  Store,
  GroupWork
} from '@mui/icons-material';
import HeroImage from '@/components/banking/HeroImage';
import FeatureCard from '@/components/banking/FeatureCard';

const features = [
  {
    icon: <Business sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Business Checking',
    description: 'Accounts designed for businesses of all sizes with flexible transaction limits.'
  },
  {
    icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Merchant Services',
    description: 'Accept payments easily and securely with our point-of-sale solutions.'
  },
  {
    icon: <Receipt sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Business Loans',
    description: 'Funding solutions to help your business grow and expand.'
  },
  {
    icon: <ShowChart sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Cash Management',
    description: 'Tools to help you manage your business finances efficiently.'
  },
  {
    icon: <Store sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Commercial Real Estate',
    description: 'Financing for your business property needs.'
  },
  {
    icon: <GroupWork sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Business Credit Cards',
    description: 'Earn rewards on your business expenses.'
  }
];

export default function BusinessBanking() {
  return (
    <Box>
      <HeroImage
        src="/images/banking/business-banking.jpg"
        title="Business Banking"
        subtitle="Tailored financial solutions to help your business thrive"
        ctaText="Business Solutions"
        secondaryCtaText="Contact Us"
        alt="Business Banking"
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Business Banking Solutions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            We understand the unique challenges businesses face. Our comprehensive suite of business banking services is designed to help your company succeed.
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
          bgcolor: 'grey.100', 
          p: 6, 
          borderRadius: 2,
          textAlign: 'center',
          mb: 8
        }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Business Banking Specialists
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Our dedicated business banking team is here to help you find the right solutions for your company's unique needs.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
          >
            Contact a Business Banker
          </Button>
        </Box>
      </Container>
    </Box>
  );
}