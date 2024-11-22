import type { ReactNode } from 'react';

import Box, { BoxProps as MuiBoxProps } from '@mui/material/Box';

import MainCard from '@/components/shared/UI/Cards/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

export interface AuthCardProps extends MuiBoxProps {
  children: ReactNode;
}

export default function AuthCard({ children, ...other }: AuthCardProps) {
  return (
    // @ts-ignore
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        '& > *': { flexGrow: 1, flexBasis: '50%' },
      }}
      content={false}
      {...other}
      border={false}
      boxShadow
      color='secondary'
      shadow={(theme: any) => theme.shadows[10]}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}

