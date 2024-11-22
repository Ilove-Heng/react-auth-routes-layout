import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function AuthBackground() {
  const theme = useTheme();

  const svg = `<svg xmlns='http://www.w3.org/2000/svg'  width='160' height='160' viewBox='0 0 200 200'><rect fill='#ffffff' width='200' height='200'/><polygon  fill='#DCEFFA' fill-opacity='1' points='100 0 0 100 100 100 100 200 200 100 200 0'/></svg>`;
  
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: -1,
        bottom: 0,
        height: '100vh',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'inherit',
        backgroundColor: theme.palette.background.default,
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
      }} 
    >
    </Box>
  );
}