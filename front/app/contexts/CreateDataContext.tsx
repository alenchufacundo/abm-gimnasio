import {
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
  Context,
  Reducer,
} from 'react';

// Tipo para las funciones que manejan el dispatch
type BoundActionsType = {
  [key: string]: (...args: any[]) => any;
};

// Tipo para la función que crea el contexto
type CreateDataContextType<StateType, ActionType> = {
  Context: Context<{
    state: StateType;
    dispatch: Dispatch<ActionType>;
    actions: BoundActionsType;
  }>;
  Provider: ({ children }: { children: ReactNode }) => JSX.Element;
};

// Función CreateDataContext
const CreateDataContext = <StateType, ActionType>(
  reducer: Reducer<StateType, ActionType>,
  actions: {
    [key: string]: (dispatch: Dispatch<ActionType>) => (...args: any[]) => void;
  },
  initialState: StateType
): CreateDataContextType<StateType, ActionType> => {
  const Context = createContext<{
    state: StateType;
    dispatch: Dispatch<ActionType>;
    actions: BoundActionsType;
  }>({
    state: initialState,
    dispatch: () => null,
    actions: {},
  });

  const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: BoundActionsType = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, dispatch, actions: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default CreateDataContext;
