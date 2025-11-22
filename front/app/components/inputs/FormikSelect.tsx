import React from "react";
import { FormControl, InputLabel, Select, FormHelperText, SelectProps } from "@mui/material";
import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FormikSelectProps = {
    formik: {
        values: FormikValues;
        touched: FormikTouched<FormikValues>;
        errors: FormikErrors<FormikValues>;
        handleChange: React.ChangeEventHandler<{ name?: string; value: unknown }>;
        handleBlur: React.FocusEventHandler<any>;
    };
    name: string;
    label: string;
    children: React.ReactNode;
} & Omit<SelectProps, "name" | "value" | "onChange" | "onBlur" | "error">;

const FormikSelect: React.FC<FormikSelectProps> = ({
    formik,
    name,
    label,
    children,
    ...props
}) => {
    const error = formik.touched[name] && Boolean(formik.errors[name]);
    return (
        <FormControl fullWidth error={error} margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                label={label}
                value={formik.values[name]}
                onChange={(event, child) => formik.handleChange(event as React.ChangeEvent<{ name?: string; value: unknown }>)}
                onBlur={formik.handleBlur}
                {...props}
            >
                {children}
            </Select>
            {error && (
                <FormHelperText>
                    {typeof formik.errors[name] === "string" ? String(formik.errors[name]) : undefined}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default FormikSelect;
