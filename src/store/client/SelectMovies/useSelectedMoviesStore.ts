import {useStore} from './Store';

export const useSelectedMoviesStore = () => {
  const {selectedMovies} = useStore(state => state.state);

  return selectedMovies;
};

export const useSelectedMoviesActions = () => {
  const {addToSelected, removeToSelected, cleanUp} = useStore(
    state => state.actions,
  );

  return {
    addToSelected,
    removeToSelected,
    cleanUp,
  };
};

export type SelectedMoviesStoreImpl = () => ReturnType<
  typeof useSelectedMoviesStore
>;

export type SelectedMoviesStoreActionsImpl = ReturnType<
  typeof useSelectedMoviesActions
>;
