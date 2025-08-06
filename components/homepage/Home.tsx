"use client";

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import Loading from '../Loading';
import { Suspense } from 'react';

// Lazy load components that are not immediately visible
const TopBanner = dynamic(() => import('./TopBanner'), { ssr: true });
const DesktopNav = dynamic(() => import('./DesktopNav'), { ssr: true });
const MobileNav = dynamic(() => import('./MobileNav'), { ssr: true });
const Hero = dynamic(() => import('./Hero'), { ssr: true });
const Services = dynamic(() => import('./Services'), { loading: () => <Loading /> });
const MoveMoney = dynamic(() => import('./MoveMoney'), { loading: () => <Loading /> });
const WhyUs = dynamic(() => import('./WhyUs'), { loading: () => <Loading /> });
const SpendingHabit = dynamic(() => import('./SpendingHabit'), { loading: () => <Loading /> });
const Customers = dynamic(() => import('./Customers'), { loading: () => <Loading /> });
const FAQs = dynamic(() => import('./FAQs'), { loading: () => <Loading /> });
const Support = dynamic(() => import('./Support'), { loading: () => <Loading /> });
const Footer = dynamic(() => import('./Footer'), { ssr: true });
const ScrollButton = dynamic(() => import('./ScrollButton'), { ssr: false });

const Home = () => {
  return (
    <Box component="main" sx={{ position: 'relative' }}>
      {/* Sticky Header */}
      <Box 
        component="header" 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          bgcolor: 'background.paper',
          zIndex: 1200,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileNav />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <DesktopNav />
        </Box>
        <TopBanner />
      </Box>

      {/* Main Content */}
      <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Hero />
        
        <Box 
          component="section"
          sx={{
            px: { xs: 2.5, sm: 5, md: 8, xl: '160px' },
            '& > *:not(:last-child)': {
              mb: { xs: 8, md: 10, xl: 12 },
            },
            '& > *:last-child': {
              mb: 0,
            },
          }}
        >
          <Suspense fallback={<Loading />}>
            <Services />
            <MoveMoney />
            <WhyUs />
            <SpendingHabit />
            <Customers />
            <FAQs />
            <Support />
          </Suspense>
        </Box>
        
        <Footer />
      </Box>
      
      <ScrollButton />
    </Box>
  );
};

export default Home;
