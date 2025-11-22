export type Usuario = {
  locales: Local[];
  usuario: any;
  login: string;
  nombre: string;
  legajo: string;
  email: string;
  permisos: Permisos;
  centroSeleccionado: Local;
};

export type Local = {
  tipoBase: string;
  tipoCentro: string;
  value: string;
  transito: string | number;
  label: string;
};

type Permisos = {
  [area: string]: string[];
};
