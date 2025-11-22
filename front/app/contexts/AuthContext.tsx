// src/context/AuthContext.ts
import CreateDataContext from './CreateDataContext';
import { Local, Usuario } from '../types/authContext';
import { Dispatch, Reducer } from 'react';

type State = {
    session: boolean | undefined;
    usuario: Usuario;
    localSeleccionado: Local | null;
};

const LocalInitialValues: Local = {
    tipoBase: '',
    tipoCentro: '',
    value: '',
    transito: '',
    label: '',
};

type Action =
    | { type: 'login'; payload: Usuario }
    | { type: 'logout' }
    | { type: 'updateSessionState'; payload: boolean | undefined }
    | { type: 'setLocalSeleccionado'; payload: Local };

const usuarioInitialValues: Usuario = {
    login: '',
    nombre: '',
    legajo: '',
    email: '',
    usuario: {},
    locales: [],
    permisos: {},
    centroSeleccionado: LocalInitialValues,
};

const LOCAL_STORAGE_KEY = 'localSeleccionado';

const getInitialLocalSeleccionado = (): Local | null => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
};
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'login': {
            const defaultLocal =
                getInitialLocalSeleccionado() || action.payload.locales?.[1] || null;
            if (defaultLocal)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultLocal));
            return {
                session: true,
                usuario: action.payload,
                localSeleccionado: defaultLocal,
            };
        }
        case 'logout': {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return {
                session: false,
                usuario: usuarioInitialValues,
                localSeleccionado: null,
            };
        }
        case 'updateSessionState':
            return {
                session: false,
                usuario: usuarioInitialValues,
                localSeleccionado: null,
            };
        case 'setLocalSeleccionado': {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
            return {
                ...state,
                localSeleccionado: action.payload,
            };
        }
        default:
            return state;
    }
};

const login = (dispatch: Dispatch<Action>) => async (usuario: Usuario) => {
    dispatch({ type: 'login', payload: usuario });
};

const logout = (dispatch: Dispatch<Action>) => async () => {
    localStorage.removeItem('localSeleccionado');
    dispatch({ type: 'logout' });
};

const updateSessionState =
    (dispatch: Dispatch<Action>) => async (state: boolean | undefined) => {
        dispatch({ type: 'updateSessionState', payload: state });
    };

const setLocalSeleccionado =
    (dispatch: Dispatch<Action>) => async (local: Local) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
        dispatch({ type: 'setLocalSeleccionado', payload: local });
    };

export const { Context, Provider } = CreateDataContext(
    reducer,
    {
        login,
        logout,
        updateSessionState,
        setLocalSeleccionado,
    },
    {
        session: undefined,
        usuario: usuarioInitialValues,
        localSeleccionado: null,
    }
);