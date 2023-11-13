"use client"
import * as React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const router = useRouter();
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setData(message);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    // Validation checks
    if (!email || !password) {
      showSnackbar("Error! Email, and Password cannot be empty", 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showSnackbar("Error! Invalid email format", 'error');
      return;
    }
    if (password.length < 8) {
      showSnackbar("Error! Password must be at least 8 characters long", 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Auth/login`, {
        email,
        passwordHash: password
      })
      localStorage.setItem("token", response.data.token)
      router.push('/');
    } catch (err) {
      showSnackbar(`Error! ${err.response.data}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  const isValidEmail = (email) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            padding: '2rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className='bg-[#ff5400]'>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='bg-gradient-to-r from-[#ff8d54] to-[#ff5400] '
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" className='text-[#00000099] underline text-sm decoration-[#00000099] hover:text-blue-500'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={data.startsWith('Error') ? 'error' : 'success'}
          >
            {data}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider >
  );
}