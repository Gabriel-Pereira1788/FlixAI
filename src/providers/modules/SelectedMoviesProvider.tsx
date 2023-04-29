import React from 'react';
import {Movie} from '../../models/Movie';

interface ContextProps {
  selectedMovies: Movie[];
  addToSelected(movie: Movie): void;
}

const SelectedMoviesContext = React.createContext({} as ContextProps);

interface State {
  selectedMovies: Movie[];
}

const initialState: State = {
  selectedMovies: [],
};

export default function SelectedMoviesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(
    (currentState: State, updatedState: Partial<State>) => ({
      ...currentState,
      ...updatedState,
    }),
    initialState,
  );

  function addToSelected(movie: Movie) {
    dispatch({
      selectedMovies: [...state.selectedMovies, movie],
    });
  }
  return (
    <SelectedMoviesContext.Provider value={{...state, addToSelected}}>
      {children}
    </SelectedMoviesContext.Provider>
  );
}

export function useSelectedMoviesContext() {
  return React.useContext(SelectedMoviesContext);
}
