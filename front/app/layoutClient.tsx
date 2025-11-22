'use client';

// import { ChildrenProps } from './types/children';
// import GlobalSnackbar from './components/GlobalSnackbar';
// import GlobalLoading from './components/GlobalLoading';
import { Provider as AlertsContextProvider } from './contexts/AlertsContext';
import { Provider as AuthProvider } from './contexts/AuthContext';
import { ThemeContextProvider, useThemeContext } from './contexts/ThemeContext';
import ThemeToggle from './theme/ThemeToggle';
import { AuthAxiosInterceptor } from './authApi/AuthApi';
import { useEffect, useState } from 'react';
// import { getUserData } from './services/utils/usuario';
import useAuth from './hooks/useAuth';
import useAlerts from './hooks/useAlerts';
import { usePathname, useRouter } from 'next/navigation';
// import Header from './components/header/Header';
// import { SnackbarProvider } from 'notistack';

// Como trailingSlash es true en next.config, agregamos una / al final.
const loginPath = '/login';

function RootLayout({ children }: any) {
  const [isLoading, setIsLoading] = useState(true);

  const { darkMode } = useThemeContext();

  const {
    actions: { login },
    state: { session },
  } = useAuth();

  const {
    actions: { startLoading, stopLoading },
  } = useAlerts();

  const router = useRouter();
  const pathname = usePathname();

  // async function cargarUsuario() {
  //   const loadingId = startLoading('Cargando datos del usuario');
  //   return getUserData({ showSnackbar: false })
  //     .then((res) => {
  //       login(res.data.data);
  //     })
  //     .catch(() => {
  //       if (pathname !== loginPath) {
  //         router.replace(loginPath);
  //       }
  //     })
  //     .finally(() => {
  //       stopLoading(loadingId);
  //       setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const saved = localStorage.getItem('localSeleccionado');
  //     if (saved) {
  //       const local = JSON.parse(saved);
  //       setLocalSeleccionado(local);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (pathname === loginPath) {
  //     setIsLoading(false);
  //   } else {
  //     cargarUsuario();
  //   }
  // }, []);

  useEffect(() => {
    if (session === false && pathname !== loginPath) {
      router.replace(loginPath);
    }
  }, [session]);

  return (
    <>
      {/* <GlobalSnackbar /> */}
      {/* <GlobalLoading /> */}
      <ThemeToggle />
      {darkMode !== undefined &&
        (session !== undefined || pathname === loginPath) &&
        !isLoading && (
          <>
            {/* {!pathname.startsWith('/login') && <Header />} */}
            {children}
          </>
        )}
    </>
  );
}

export default function LayoutClient({ children }: any) {
  return (
    <ThemeContextProvider>
      <AlertsContextProvider>
        <AuthProvider>
          <AuthAxiosInterceptor>
            {/* <ApiInterceptor> */}
            {/* <SnackbarProvider autoHideDuration={3000}> */}
              <RootLayout>{children}</RootLayout>
              {/* </ApiInterceptor> */}
            {/* </SnackbarProvider> */}
          </AuthAxiosInterceptor>
        </AuthProvider>
      </AlertsContextProvider>
    </ThemeContextProvider>
  );
}
