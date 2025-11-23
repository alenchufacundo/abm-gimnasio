"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikValues, FormikTouched, FormikErrors } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useTheme } from "@mui/material/styles";

type FormikTextFieldProps = {
    formik: {
        values: FormikValues;
        touched: FormikTouched<FormikValues>;
        errors: FormikErrors<FormikValues>;
        handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    };
    name: string;
    label: string;
    type?: string;
    variant?: TextFieldProps["variant"];
    fullWidth?: boolean;
    isPassword?: boolean;
} & Omit<TextFieldProps, "name" | "label" | "type" | "variant" | "fullWidth" | "value" | "onChange" | "onBlur" | "error" | "helperText">;

const FormikTextField: React.FC<FormikTextFieldProps> = ({
    formik,
    name,
    label,
    type = "text",
    variant = "outlined",
    fullWidth = true,
    isPassword = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const theme = useTheme();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <TextField
            name={name}
            label={label}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            variant={variant}
            fullWidth={fullWidth}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && typeof formik.errors[name] === "string" ? String(formik.errors[name]) : undefined}
            sx={{
                mb: 2,
                bgcolor: theme.palette.mode === "dark" ? "#181A1B" : "#f7fafd",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: theme.palette.mode === "dark" ? "#181A1B" : "#f7fafd",
                    color: theme.palette.text.primary,
                    "& fieldset": {
                        borderColor: theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                    },
                },
                "& .MuiInputLabel-root": {
                    color: theme.palette.mode === "dark" ? theme.palette.primary.light : "#1976d2",
                    fontWeight: 600,
                    fontSize: '0.95rem',
                },
            }}
            slotProps={
                isPassword
                    ? {
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }
                    : undefined
            }
            size="small"
            {...props}
        />
    );
};

export default FormikTextField;