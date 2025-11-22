'use client';

import { Box, Button, Divider, Typography, Stack } from '@mui/material';
import FormikTextField from '@/app/components/inputs/FormikTextField';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useFormik } from 'formik';

const FormLogin = () => {
    const formLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            // Aquí va tu lógica de login
            console.log('Login usuario:', values);
        }
    });

    const handleGoogleLogin = () => {
        // Aquí va tu lógica de login con Google
        console.log('Login con Google');
        // window.location.href = '/api/auth/google'; // ejemplo
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 8,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h5" align="center" mb={2} fontWeight={600}>
                Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={formLogin.handleSubmit}>
                <FormikTextField
                    formik={formLogin}
                    name="email"
                    label="Email"
                    type="email"
                    margin="normal"
                    fullWidth
                />
                <FormikTextField
                    formik={formLogin}
                    name="password"
                    label="Contraseña"
                    type="password"
                    margin="normal"
                    fullWidth
                    isPassword
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Ingresar
                </Button>
            </Box>
            <Divider sx={{ my: 3 }}>o</Divider>
            <Stack spacing={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                >
                    Ingresar con Google
                </Button>
                <Typography align="center" variant="body2">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                        Registrate
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
};

export default FormLogin;