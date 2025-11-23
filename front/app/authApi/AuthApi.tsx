import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useRef } from 'react';
import useAlerts from '../hooks/useAlerts';

export interface CustomAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  showSnackbar?: boolean;
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

  const mountedRef = useRef(false);
  const interceptorIdRef = useRef<number | null>(null);

  const getErrorMessage = (res: any): string => {
    if (res?.data?.message) return res.data.message;
    return 'Ha ocurrido un error inesperado.';
  };

  const handleNetworkError = (errorMessage: string) => {
    let message = 'Error de red. Por favor, verifica tu conexión a Internet.';
    if (errorMessage === 'Request failed with status code 0') {
      message = 'Error de CORS. Verifica tu configuración de CORS en el servidor.';
    }
    openSnackbar({ message, severity: 'error' });
  };

  const handleErrorResponse = (error: AxiosError | any) => {
    if (error.response) {
      const message = getErrorMessage(error.response);
      if (message) openSnackbar({ message, severity: 'error' });
    } else {
      handleNetworkError(error.message);
    }
    return Promise.reject(error);
  };

  useEffect(() => {
    // Evitar registrar más de una vez
    if (mountedRef.current) return;
    mountedRef.current = true;

    const resInterceptor = (response: AxiosResponse) => {
      if (response.config.url === '/usuario') {
        sessionStorage.setItem('usuario', response.data.data.usuario.login);
      }
      const config = response.config as CustomAxiosRequestConfig;
      if (config.showSnackbar !== false && response.data?.message) {
        openSnackbar({ message: response.data.message, severity: 'success' });
      }
      return response;
    };

    const errInterceptor = (error: AxiosError) => handleErrorResponse(error);

    interceptorIdRef.current = instance.interceptors.response.use(resInterceptor, errInterceptor);

    return () => {
      if (interceptorIdRef.current !== null) {
        instance.interceptors.response.eject(interceptorIdRef.current);
      }
    };
  }, [openSnackbar]);

  // Renderizamos los children inmediatamente (no bloquear render)
  return <>{children}</>;
}

export default instance;
export { AxiosInterceptor as AuthAxiosInterceptor };