import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CommonColors {
        accent: string;
        box: string;
        tablerIcon: string;
        filesUpload: string;
        tableRowEven: string; // Agregar color de fila par
        tableRowOdd: string; // Agregar color de fila impar
    }
    interface Palette {
        tipoCentro: {
            L: string;
            P: string;
            I: string;
            N: string;
            E: string;
        };
        superlight: string;
        agenda: {
            conAgenda: string;
            sinAgenda: string;
            text: string;
        };
    }
    interface PaletteOptions {
        tipoCentro?: {
            L?: string;
            P?: string;
            I?: string;
            N?: string;
            E?: string;
        };
        superlight: string;
        agenda: {
            conAgenda: string;
            sinAgenda: string;
            text: string;
        };
    }
}

const baseTheme: ThemeOptions = {
    components: {
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState: { multiline, label, size }, theme }) => ({
                    '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,
                        borderColor: theme.palette.primary,
                        height: multiline
                            ? 'auto'
                            : theme.spacing(size === 'medium' ? 6 : 5),
                        '& fieldset': {
                            top: !label && 0,
                        },
                        ...((size === 'small' || size === 'medium') && {
                            ...theme.typography.body1,
                        }),
                    },
                    '& .MuiInputLabel-root.MuiInputLabel-sizeSmaller': {
                        fontSize: theme.typography.body2.fontSize,
                    },
                    '& legend span': {
                        display: 'none',
                    },
                    '& .MuiInputAdornment-positionEnd': {
                        marginRight: '6px',
                    },
                    // Eliminar el color amarillo de autocompletado
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
                        WebkitTextFillColor: theme.palette.text.primary,
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    position: 'static',
                    transform: 'none',
                    marginBottom: theme.spacing(0.5),
                    fontSize: theme.typography.body1.fontSize,
                    color: theme.palette.text.primary,
                    transition: 'color 0.3s',
                    '&.Mui-focused': {
                        color: theme.palette.primary.main,
                        '& .ignore-focus': {
                            color: 'inherit', // Mantiene el color original para elementos con la clase ignore-focus
                        },
                    },
                    '&.MuiInputLabel-sizeSmaller': {
                        fontSize: theme.typography.body2.fontSize,
                    },
                    '& .MuiFormLabel-asterisk': {
                        display: 'none',
                    },
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    textTransform: 'none',
                    fontSize: theme.typography.body1.fontSize,
                    padding: theme.spacing(1, 3),
                    boxShadow: 'none',
                    '&.marginLabel': {
                        marginTop: '27px', // Margen superior para simular el espacio de un label
                        height: theme.spacing(5), // Mismo tamaño que un input
                    },
                }),
                contained: ({ ownerState, theme }) => {
                    const color = ownerState?.color || 'primary';

                    // Solo aplicar estilos personalizados para 'inherit' y 'primary'
                    if (color !== 'inherit' && color !== 'primary') {
                        return {};
                    }

                    return {
                        color: ownerState?.disabled
                            ? theme.palette.text.disabled
                            : theme.palette.common.white,
                        background: ownerState?.disabled
                            ? theme.palette.action.disabledBackground
                            : theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            boxShadow: 'none',
                        },
                    };
                },
                outlined: ({ ownerState, theme }) => {
                    const color = ownerState?.color || 'primary';

                    // Solo aplicar estilos personalizados para 'inherit' y 'primary'
                    if (color !== 'inherit' && color !== 'primary') {
                        return {};
                    }

                    return {
                        border: '1px solid #DDDDDD',
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            boxShadow: 'none',
                        },
                    };
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.primary,
                    background: theme.palette.background.default,
                    boxShadow: theme.shadows[0],
                    borderBottom: '1px solid ' + theme.palette.divider,
                }),
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius * 2,
                    '& .MuiAccordionSummary-root.Mui-expanded': {
                        backgroundColor: theme.palette.action.hover,
                        '& .MuiTypography-root': {
                            fontWeight: 'bold',
                        },
                    },
                    '&::before': {
                        display: 'none', // Oculta el separador
                    },
                }),
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius * 2,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        '& .MuiTypography-root': {
                            fontWeight: 'bold',
                        },
                    },
                }),
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: 42,
                    height: 26,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: 2,
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                            transform: 'translateX(16px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: theme.palette.primary,
                                opacity: 1,
                                border: 0,
                            },
                            '&.Mui-disabled + .MuiSwitch-track': {
                                opacity: 0.5,
                            },
                        },
                        '&.Mui-focusVisible .MuiSwitch-thumb': {
                            color: '#33cf4d',
                            border: '6px solid #fff',
                        },
                        '&.Mui-disabled .MuiSwitch-thumb': {
                            color: theme.palette.grey[100],
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: 0.7,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 22,
                        height: 22,
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor: theme.palette.divider,
                        opacity: 1,
                        transition: theme.transitions.create(['background-color'], {
                            duration: 500,
                        }),
                    },
                }),
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: '40px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    borderRadius: theme.shape.borderRadius * 2,
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        borderColor: 'transparent',
                        color: theme.palette.common.accent,
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }),
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '&.Mui-disabled': {
                        color: theme.palette.text.disabled,
                    },
                }),
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ theme }) => ({
                    fontSize: theme.typography.subtitle2.fontSize,
                    padding: theme.spacing(1),
                    borderRadius: theme.shape.borderRadius,
                }),
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
};

export const lightThemeOptions: ThemeOptions = {
    ...baseTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#186abb',
            dark: '#093D70',
            light: '#2d9aed',
        },
        secondary: {
            main: '#7b839a',
        },
        text: {
            primary: '#333951',
            secondary: '#3c3c3c',
            disabled: '#1d1b2061',
        },
        error: {
            main: '#d32f2f',
            light: '#FF6961',
            dark: '#8B0000',
        },
        success: {
            main: '#388e3c',
            light: '#B4D3B2',
            dark: '#1B5E20',
        },
        info: {
            main: '#0288d1',
        },
        warning: {
            main: '#ed6c02',
            light: '#ff8c2e',
            dark: '#ba5502',
        },
        background: {
            default: '#f8f9fc',
            paper: '#f8f9fc',
        },
        action: {
            disabledBackground: '#1d1b201f',
            hover: 'rgba(0, 0, 0, 0.05)',
        },
        common: {
            accent: '#ffffff',
            box: '#3339511A',
            tablerIcon: 'inherit',
            filesUpload: '#1890ff',
            tableRowEven: '#eeeff3', // Color de filas pares
            tableRowOdd: '#e3e5ec', // Color de filas impares
        },
        divider: '#b7b7b7',
        superlight: '#c9e2f5', //superlight
        agenda: {
            conAgenda: '#e0f7fa',
            sinAgenda: '#ffebee',
            text: '#333951;',
        },
        tipoCentro: {
            L: '#FF5733', // Local
            P: '#3388FF', // Proveedor
            I: '#33FF57', // Institución
            N: '#FFC300', // Cliente Interno
            E: '#A033FF', // Cliente Externo
        },
    },
};

export const darkThemeOptions: ThemeOptions = {
    ...baseTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#1b76d2',
            dark: '#1864c0',
            light: '#2397f3',
        },
        secondary: {
            main: '#f48fb1',
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#e0e0e0',
            disabled: '#979797',
        },
        error: {
            main: '#ef5350',
            light: '#FF6961',
            dark: '#8B0000',
        },
        success: {
            main: '#549c57',
            light: '#B4D3B2',
            dark: '#224623',
        },
        info: {
            main: '#29b6f6',
        },
        warning: {
            main: '#ffa726',
            light: '#FFEE8C',
            dark: '#7D6608',
        },
        background: {
            default: '#181A1B',
            paper: '#181A1B',
        },
        action: {
            disabledBackground: '#3e3b41',
            hover: 'rgba(255, 255, 255, 0.05)',
        },
        common: {
            accent: '#ffffff',
            box: '#dedede',
            tablerIcon: '#000',
            filesUpload: '#1890ff',
            tableRowEven: '#303338', // Color de filas pares
            tableRowOdd: '#252629', // Color de filas impares
        },
        divider: '#979797',
        superlight: '#b2d9f7',
        agenda: {
            conAgenda: '#e0f7fa',
            sinAgenda: '#ffebee',
            text: '#000000ff',
        },
        tipoCentro: {
            L: '#FF8A65', // Local - versión más oscura
            P: '#64B5F6', // Proveedor
            I: '#81C784', // Institución
            N: '#FFD54F', // Cliente Interno
            E: '#BA68C8', // Cliente Externo
        },
    },
};
