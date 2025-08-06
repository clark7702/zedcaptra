"use client";
import React, { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Stack, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AppName } from '@/lib/consts';

import { motion, AnimatePresence } from "motion/react"

const navItems = [
  { title: 'Personal', path: '/personal-banking' },
  { title: 'Business', path: '/business-banking' },
  { title: 'Wealth', path: '/wealth-management' },
  { title: 'About', path: '/about' },
  { title: 'Insights', path: '/insights' },
];

const DesktopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    router.push('/auth/signin');
  };

  const pathName = usePathname();

  return (
    <Box 
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'all 0.3s ease-in-out',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'divider' : 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: { xs: 64, md: 80 },
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Logo */}
          <Link href="/" passHref>
            <Box 
              component="a"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #003366 0%, #0066CC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                {AppName}
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" spacing={4}>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Typography
                    component="a"
                    sx={{
                      color: pathName === item.path ? 'primary.main' : 'text.primary',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        transform: 'scaleX(0)',
                        height: '2px',
                        bottom: '-4px',
                        left: 0,
                        backgroundColor: 'primary.main',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.3s ease-out',
                      },
                      '&:hover:after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      },
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>

          {/* CTA Buttons */}
          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/contact" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: 'none',
                  borderRadius: '4px',
                  fontWeight: 500,
                  px: 3,
                }}
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/auth/signin" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  borderRadius: '4px',
                  fontWeight: 500,
                  px: 3,
                  boxShadow: '0 4px 14px rgba(0, 103, 255, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 103, 255, 0.3)',
                  },
                }}
              >
                Online Banking
              </Button>
            </Link>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'text.primary',
              p: 1,
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'background.paper',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              zIndex: 1200,
            }}
          >
            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} passHref>
                    <Typography
                      component="a"
                      onClick={toggleMobileMenu}
                      sx={{
                        display: 'block',
                        p: 1.5,
                        color: pathName === item.path ? 'primary.main' : 'text.primary',
                        fontWeight: 500,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          color: 'primary.main',
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
                <Stack direction="column" spacing={2} sx={{ mt: 2, px: 1 }}>
                  <Link href="/contact" passHref>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={toggleMobileMenu}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '4px',
                        fontWeight: 500,
                      }}
                    >
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/auth/signin" passHref>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={toggleMobileMenu}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '4px',
                        fontWeight: 500,
                        boxShadow: '0 4px 14px rgba(0, 103, 255, 0.2)',
                      }}
                    >
                      Online Banking
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default DesktopNav;
