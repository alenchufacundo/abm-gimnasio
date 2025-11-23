'use client';

import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import FormikTextField from '@/app/components/inputs/FormikTextField';

const FormRegistro = () => {
    const formik = useFormik({
        initialValues: {
            empresa: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validate: values => {
            const errors: Record<string, string> = {};
            if (!values.empresa) errors.empresa = 'Requerido';
            if (!values.email) errors.email = 'Requerido';
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Email inválido';
            if (!values.password) errors.password = 'Requerido';
            if (values.password.length < 6) errors.password = 'Mínimo 6 caracteres';
            if (!values.repeatPassword) errors.repeatPassword = 'Requerido';
            if (values.password !== values.repeatPassword) errors.repeatPassword = 'Las contraseñas no coinciden';
            return errors;
        },
        onSubmit: values => {
            // Aquí va tu lógica de registro
            console.log('Registro:', values);
        }
    });

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
                Registro de Empresa
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <FormikTextField
                    formik={formik}
                    name="empresa"
                    label="Nombre de la empresa"
                    margin="normal"
                    fullWidth
                />
                <FormikTextField
                    formik={formik}
                    name="email"
                    label="Email"
                    type="email"
                    margin="normal"
                    fullWidth
                />
                <FormikTextField
                    formik={formik}
                    name="password"
                    label="Contraseña"
                    type="password"
                    margin="normal"
                    fullWidth
                    isPassword
                />
                <FormikTextField
                    formik={formik}
                    name="repeatPassword"
                    label="Repetir contraseña"
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
                    Registrarse
                </Button>
            </Box>
        </Box>
    );
};

export default FormRegistro;
