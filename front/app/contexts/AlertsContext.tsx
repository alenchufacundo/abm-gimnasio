import { Component, Dispatch, Reducer } from 'react';
import generateId from '../utils/generateId';
import CreateDataContext from './CreateDataContext';

export interface SnackbarState {
    message: string;
    severity: 'success' | 'warning' | 'error';
    icon?: null | Component;
    autoHideDuration: number;
    button?: {
        label: string;
        onClick: () => void;
    };
}

export interface State {
    snackbarQueue: SnackbarState[];
    loadingInstances: {
        id: string;
        label: string;
    }[];
    refreshSessionUser: string;
    progreso: any;
    unsavedChangesAlert: {
        open: boolean;
        actions: {
            onCancelar: () => void;
            onContinuar: () => void;
        };
    };
}

type Action =
    | { type: 'enqueueSnackbar'; payload: SnackbarState }
    | { type: 'dequeueSnackbar' }
    | { type: 'startLoading'; payload: { label: string; id: string } }
    | { type: 'startProgreso'; payload: { total?: number | null; id: string } }
    | { type: 'stopLoading'; payload: string }
    | { type: 'stopProgreso'; payload: { id: string } }
    | { type: 'updateProgreso'; payload: { sumar: number } }
    | { type: 'setRefreshSessionUser'; payload: string }
    | {
        type: 'setUnsavedChangesAlert';
        payload: {
            open: boolean;
            actions: {
                onCancelar: () => void;
                onContinuar: () => void;
            };
        };
    };

const alertsReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'enqueueSnackbar':
            return {
                ...state,
                snackbarQueue: [...state.snackbarQueue, action.payload],
            };
        case 'dequeueSnackbar':
            return {
                ...state,
                snackbarQueue: state.snackbarQueue.slice(1),
            };
        case 'startLoading':
            return {
                ...state,
                loadingInstances: [...state.loadingInstances, action.payload],
            };
        case 'stopLoading':
            return {
                ...state,
                loadingInstances: state.loadingInstances.filter(
                    (instance) => instance.id !== action.payload
                ),
            };
        case 'startProgreso': {
            const { id, total } = action.payload;
            return {
                ...state,
                progreso: { id, parcial: 0, total },
            };
        }
        case 'updateProgreso': {
            const { sumar } = action.payload;
            const nuevoParcial = state.progreso.parcial + sumar;
            return {
                ...state,
                progreso: { ...state.progreso, parcial: nuevoParcial },
            };
        }
        case 'stopProgreso': {
            const { id } = action.payload;
            if (Number(state.progreso?.id) === Number(id)) {
                return {
                    ...state,
                    progreso: null,
                };
            }
            return state;
        }
        case 'setRefreshSessionUser':
            return {
                ...state,
                refreshSessionUser: action.payload,
            };
        case 'setUnsavedChangesAlert':
            return {
                ...state,
                unsavedChangesAlert: action.payload,
            };
        default:
            return state;
    }
};

// ✅ NUEVAS acciones para la cola de snackbars
const openSnackbar =
    (dispatch: Dispatch<Action>) => (snackbar: SnackbarState) => {
        dispatch({ type: 'enqueueSnackbar', payload: snackbar });
    };

const closeSnackbar = (dispatch: Dispatch<Action>) => () => {
    dispatch({ type: 'dequeueSnackbar' });
};

const startLoading =
    (dispatch: Dispatch<Action>) => (label: string, total: number | null) => {
        const id = generateId();
        dispatch({ type: 'startLoading', payload: { label, id } });
        if (total) {
            dispatch({ type: 'startProgreso', payload: { id, total } });
        }
        return id;
    };

const stopLoading = (dispatch: Dispatch<Action>) => (instanceId: string) => {
    dispatch({ type: 'stopLoading', payload: instanceId });
    dispatch({ type: 'stopProgreso', payload: { id: instanceId } });
};

const updateProgreso = (dispatch: Dispatch<Action>) => (sumar: number) => {
    dispatch({ type: 'updateProgreso', payload: { sumar } });
};

const refreshSession = (dispatch: Dispatch<Action>) => (usuario: string) => {
    dispatch({ type: 'setRefreshSessionUser', payload: usuario });
};

const openUnsavedChangesAlert =
    (dispatch: Dispatch<Action>) =>
        (unsavedChangesAlert: {
            actions: {
                onCancelar: () => void;
                onContinuar: () => void;
            };
        }) => {
            dispatch({
                type: 'setUnsavedChangesAlert',
                payload: {
                    open: true,
                    ...unsavedChangesAlert,
                },
            });
        };

const closeUnsavedChangesAlert = (dispatch: Dispatch<Action>) => () => {
    dispatch({
        type: 'setUnsavedChangesAlert',
        payload: {
            open: false,
            actions: {
                onCancelar: () => { },
                onContinuar: () => { },
            },
        },
    });
};

export const { Context, Provider } = CreateDataContext(
    alertsReducer,
    {
        openSnackbar,
        closeSnackbar,
        startLoading,
        stopLoading,
        updateProgreso,
        refreshSession,
        openUnsavedChangesAlert,
        closeUnsavedChangesAlert,
    },
    {
        snackbarQueue: [],
        loadingInstances: [],
        refreshSessionUser: '',
        progreso: null,
        unsavedChangesAlert: {
            open: false,
            actions: {
                onCancelar: () => { },
                onContinuar: () => { },
            },
        },
    }
);