import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import useAlerts from '../hooks/useAlerts';
// import { API_AUTH_BASEPATH } from '../../../index';

export interface CustomAxiosRequestConfig<T = any>
    extends AxiosRequestConfig<T> {
    showSnackbar?: boolean; // Propiedad para controlar la visualización del snackbar en caso de éxito
}

const API_AUTH_BASEPATH = '';

const instance = axios.create({
    baseURL: API_AUTH_BASEPATH,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

function AxiosInterceptor({ children }: { children: ReactNode }) {
    const {
        actions: { openSnackbar },
    } = useAlerts();
    const [isSet, setIsSet] = useState(false);

    // Obtener el mensaje de error de una respuesta
    const getErrorMessage = (res: any): string => {
        if (res?.data?.message) {
            return res.data.message;
        }
        return 'Ha ocurrido un error inesperado.'; // Mensaje de error genérico
    };

    // Manejar respuestas de error
    const handleErrorResponse = (error: AxiosError | any) => {
        let message;

        if (error.response) {
            const res = error.response;

            // Obtener el mensaje de error
            message = getErrorMessage(res);

            if (message) {
                openSnackbar({
                    message,
                    severity: 'error',
                });
            }
        } else {
            handleNetworkError(error.message);
        }

        return Promise.reject(error);
    };

    // Manejar errores de red
    const handleNetworkError = (errorMessage: string) => {
        let message = 'Error de red. Por favor, verifica tu conexión a Internet.';
        if (errorMessage === 'Request failed with status code 0') {
            message =
                'Error de CORS. Verifica tu configuración de CORS en el servidor.';
        }

        openSnackbar({
            message,
            severity: 'error',
        });
    };

    useEffect(() => {
        const resInterceptor = (response: AxiosResponse) => {
            // Si el usuario es recuperado exitosamente
            if (response.config.url === '/usuario') {
                sessionStorage.setItem('usuario', response.data.data.usuario.login);
            }

            // Mostrar snackbar de éxito si showSnackbar no es false
            const config = response.config as CustomAxiosRequestConfig; // Aseguramos el tipo
            if (config.showSnackbar !== false && response.data.message) {
                openSnackbar({
                    message: response.data.message,
                    severity: 'success',
                });
            }
            return response;
        };

        const errInterceptor = (error: AxiosError) => {
            return handleErrorResponse(error);
        };

        const responseInterceptor = instance.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );

        setIsSet(true);

        return () => instance.interceptors.response.eject(responseInterceptor);
    }, []);

    // Evitar devolver booleano en vez de ReactNode
    return isSet ? <>{children}</> : null;
}

export default instance;
export { AxiosInterceptor as AuthAxiosInterceptor };