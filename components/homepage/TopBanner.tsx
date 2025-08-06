"use client";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { bankEmail, bankPhone, bankWorkingHours } from "../../constants/Settings";
import { motion } from "motion/react"
import { Box, Container, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const TopBanner = () => {
  const router = useRouter();
  return (
    <Box 
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Stack 
            direction="row" 
            spacing={3} 
            divider={
              <Box sx={{ width: '1px', bgcolor: 'divider', height: '16px', my: 'auto' }} />
            }
            flexWrap="wrap"
            justifyContent="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AiOutlinePhone style={{ color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">
                {bankPhone}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AiOutlineMail style={{ color: 'primary.main' }} />
              <Typography 
                variant="caption" 
                color="text.secondary"
                component="a"
                href={`mailto:${bankEmail}`}
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                {bankEmail}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {bankWorkingHours}
              </Typography>
            </Stack>
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push('/auth/signin')}>
              <Typography 
                variant="caption" 
                color="primary"
                sx={{
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Contact Advisor
              </Typography>
            </motion.div>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div whileHover={{ y: -1 }} onClick={() => router.push('/auth/signin')}>
                <Typography 
                  variant="caption" 
                  color="primary"
                  sx={{
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Branch Locator
                </Typography>
              </motion.div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default TopBanner;
