// app/banking/layout.tsx
import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function BankingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" passHref legacyBehavior>
            <MuiLink>Home</MuiLink>
          </Link>
          <Typography>Banking</Typography>
        </Breadcrumbs>
        {children}
      </Container>
    </Box>
  );
}