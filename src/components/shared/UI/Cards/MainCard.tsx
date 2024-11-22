import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

type MainCardType = {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: any;
  contentSX?: object;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  modal?: boolean;
  secondary?: ReactElement | ReactElement[];
  shadow?: any;
  sx?: any;
  title?: string | ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider,
      elevation,
      modal,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[800],
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.shadows[10] : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || theme.shadows : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* divider */}
        {divider && <Divider sx={{ mt: 2, mb: 2 }} />}
      </Card>
    );
  }
);

export default MainCard;

