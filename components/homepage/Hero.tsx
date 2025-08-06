import React from "react";
import { Button, Typography, Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <Box 
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(0, 41, 107, 0.9) 0%, rgba(0, 20, 53, 0.8) 100%)',
          },
        }}
      >
        {/* <Image
          src="/images/hero-banking.jpg"
          alt="Global banking"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        /> */}
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            color: 'white',
            maxWidth: { xs: '100%', md: '65%' },
            py: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Global Banking Solutions for Discerning Clients
          </Typography>
          
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 300,
              lineHeight: 1.6,
              mb: 4,
              maxWidth: '90%',
              opacity: 0.9,
            }}
          >
            Experience banking without borders. Our private banking services offer security, discretion, and global access to financial markets, tailored to your unique needs.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Link href="/auth/signin" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Discover Private Banking
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: '4px',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Speak with an Advisor
              </Button>
            </Link>
          </Stack>

          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>25+</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Global Offices</Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>$50B+</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Assets Under Management</Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>150+</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Countries Served</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
