import {
  createFileRoute,
  Link as RouterLink,
  redirect,
  useRouter
} from '@tanstack/react-router'
import { z } from 'zod'

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

// assets
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

// project import
import AuthWrapper from 'components/auth/AuthWrapper'
import { useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import { useAuth } from '@/context/auth-context';
import { sleep } from 'utils/sleep';

// formik
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

// i18n
import { useTranslation } from 'react-i18next';





interface LoginValues {
  email: string;
  password: string;
  submit: null;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
// const fallback = '/$lang/dashboard', params: { lang: 'en' }

export const Route = createFileRoute('/$lang/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/$lang/dashboard', params: { lang: 'en' } })
    }
  },
  component: LoginComponent,
})


function LoginComponent() {
  const { t } = useTranslation();
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const search = Route.useSearch()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSocialLogin = (socialMedia: string) => {
    console.log("👽 : socialMedia:", socialMedia);
    // Handle social login logic here
  };


  const handleSubmit = async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    setSubmitting(true); 
    try {
        console.log('Submitting Form Values:', values.email);
        const username = values.email;

        await auth.login(username)

        await router.invalidate();

        await sleep(1);

        await navigate({ to: search.redirect || '/$lang/dashboard', params: { lang: 'en' } });
      
    } catch (error) {
        console.error('Error logging in: ', error)
    } finally {
        setSubmitting(false);
    }
  };


  return (
    <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h6" color="inherit">{ t('login.button') }</Typography>
          <Typography component={RouterLink} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Don&apos;t have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
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
        <form noValidate onSubmit={handleSubmit} >
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
                <Button 
                disableElevation 
                disabled={isSubmitting} 
                fullWidth 
                size="large" 
                type="submit" 
                variant="contained" 
                color="primary"
                >
                   {isSubmitting ?  <CircularProgress color="inherit" size={30} /> : t('login.button')}
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
                      onClick={() => handleSocialLogin('Google')}
                      startIcon={<GoogleIcon />}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: 'none', backgroundColor: '#e0483c', color: '#fff' }}
                  >
                    Google
                  </Button>
                  </Grid>
                  {/* Facebook Login */}
                  <Grid item xs={12} sm={4}>
                    <Button
                      onClick={() => handleSocialLogin('Facebook')}
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
                    onClick={() => handleSocialLogin('GitHub')}
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
      </Grid>
    </Grid>
  </AuthWrapper>
  )
}
