"use client";

import { Box, Container, Typography, Link, Grid, IconButton, useTheme } from '@mui/material';
import { motion } from "motion/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { bankName, bankAddress, bankPhone, bankEmail } from "../../constants/Settings";
import Image from 'next/image';

import logoImage from "../../assets/brand/logo.png";

const year = new Date().getFullYear();

const Footer = () => {
  const theme = useTheme();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'News & Media', url: '/news' },
        { label: 'Contact Us', url: '/contact' },
      ]
    },
    {
      title: 'Banking',
      links: [
        { label: 'Personal Banking', url: '/personal' },
        { label: 'Business Banking', url: '/business' },
        { label: 'Wealth Management', url: '/wealth' },
        { label: 'Loans & Mortgages', url: '/loans' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Online Banking', url: '/online-banking' },
        { label: 'Mobile App', url: '/mobile' },
        { label: 'Rates', url: '/rates' },
        { label: 'Security Center', url: '/security' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Use', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' },
        { label: 'Disclosures', url: '/disclosures' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook size={20} />, url: 'https://facebook.com' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com' },
    { icon: <FaInstagram size={20} />, url: 'https://instagram.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 6 }}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
                        <Link href="/" >
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
                           <Image src={logoImage} alt="Logo" width={150} height={150} />
                          </Box>
                        </Link>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                Providing trusted financial services with integrity and innovation since 1995. 
                Your financial goals are our priority.
              </Typography>
              
              {/* Social Media Links */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        bgcolor: 'action.hover',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>

              {/* Contact Info */}
              <Box sx={{ '& > div': { display: 'flex', alignItems: 'flex-start', mb: 1.5 } }}>
                <div>
                  <FaMapMarkerAlt style={{ marginRight: '12px', marginTop: '4px', color: theme.palette.primary.main }} />
                  <Typography variant="body2" color="text.secondary">
                    {bankAddress}
                  </Typography>
                </div>
                <div>
                  <FaPhoneAlt style={{ marginRight: '12px', marginTop: '2px', color: theme.palette.primary.main }} />
                  <Link href={`tel:${bankPhone}`} color="text.secondary" underline="hover">
                    {bankPhone}
                  </Link>
                </div>
                <div>
                  <FaEnvelope style={{ marginRight: '12px', marginTop: '2px', color: theme.palette.primary.main }} />
                  <Link href={`mailto:${bankEmail}`} color="text.secondary" underline="hover">
                    {bankEmail}
                  </Link>
                </div>
              </Box>
            </motion.div>
          </Grid>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <Grid item xs={6} sm={6} md={2} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: 'text.primary',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '40px',
                      height: '3px',
                      bgcolor: 'primary.main',
                      borderRadius: '3px',
                    },
                  }}
                >
                  {column.title}
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={link.url}
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          display: 'inline-block',
                          py: 0.75,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                            transform: 'translateX(5px)',
                          },
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Copyright and Legal */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {year} {bankName}. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" color="text.secondary" variant="body2" underline="hover">
              Privacy Policy
            </Link>
            <Link href="/terms" color="text.secondary" variant="body2" underline="hover">
              Terms of Service
            </Link>
            <Link href="/cookies" color="text.secondary" variant="body2" underline="hover">
              Cookie Policy
            </Link>
          </Box>
        </Box>

        {/* Regulatory Information */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
            {bankName} is a member of the FDIC and an Equal Housing Lender. NMLS #123456. 
            Banking services provided by {bankName}, Member FDIC. {year} {bankName}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
