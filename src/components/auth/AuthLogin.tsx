import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useRouter, useNavigate } from '@tanstack/react-router';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '@/context/auth-context';
import { sleep } from 'utils/sleep';

interface LoginValues {
    email: string;
    password: string;
    submit: null;
}


export default function AuthLogin() {
    const auth = useAuth()
    const router = useRouter()
    const navigate = useNavigate()

  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const handleSubmit = async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    setSubmitting(true); 
    try {
        console.log('Submitting Form Values:', values.email);
        const username = values.email;
        await auth.login(username)

        await router.invalidate();

        await sleep(1);

        await navigate({ to: '/$lang/dashboard', params: { lang: 'en' } });

    } catch (error) {
        console.error('Error logging in: ', error)
    } finally {
        setSubmitting(false);
    }

    // console.log('Form Values:', values);
    // setSubmitting(false); // To reset the "isSubmitting" state
    // You can handle authentication logic here, e.g., API call:
    // authenticateUser(values.email, values.password);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6" fontFamily={'Roboto'} fontSize={14}>Keep me signed in</Typography>}
                />
                <Link variant="h6" component={RouterLink} color="text.primary" fontFamily={'Roboto'} fontSize={14}>
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="caption">Login with</Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              {/* Social Login Component */}
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    {/* Google Login */}
                  <Button
                      startIcon={<GoogleIcon />}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                  >
                    Google
                  </Button>
                  </Grid>
                  {/* Facebook Login */}
                  <Grid item xs={12} sm={4}>
                    <Button
                      startIcon={<FacebookIcon />}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: 'none', backgroundColor: '#1877F2', color: '#fff' }}
                    >
                      Facebook
                    </Button>
                  </Grid>

                   {/* GitHub Login */}
                   <Grid item xs={12} sm={4}>
                  <Button
                    startIcon={<GitHubIcon />}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{ textTransform: 'none', backgroundColor: '#333', color: '#fff' }}
                  >
                    GitHub
                  </Button>
                </Grid>
              </Grid>
          
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
