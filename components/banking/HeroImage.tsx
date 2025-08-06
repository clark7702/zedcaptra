// components/banking/HeroImage.tsx
import { Box, Typography, Button, Stack } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { ReactNode } from 'react';

interface HeroImageProps extends Omit<ImageProps, 'alt'> {
  title: string;
  subtitle: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  children?: ReactNode;
}

export default function HeroImage({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  children,
  ...imageProps
}: HeroImageProps) {
  return (
    <Box sx={{ 
      position: 'relative', 
      height: '400px', 
      mb: 6,
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      {imageProps.src && (
        <Image
          src={imageProps.src}
          alt={imageProps.alt || title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: '800px' }}>
          {subtitle}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {ctaText && (
            <Button 
              variant="contained" 
              size="large" 
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          )}
          {secondaryCtaText && (
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              onClick={onSecondaryCtaClick}
            >
              {secondaryCtaText}
            </Button>
          )}
        </Stack>
        {children}
      </Box>
    </Box>
  );
}