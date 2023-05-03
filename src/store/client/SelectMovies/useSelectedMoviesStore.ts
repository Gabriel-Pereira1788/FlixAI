import {useStore} from './Store';

export const useSelectedMoviesStore = () => {
  const {
    state,
    actions: {addToSelected, removeToSelected, cleanUp},
  } = useStore();

  return {
    state,
    addToSelected,
    removeToSelected,
    cleanUp,
  };
};

export type SelectedMoviesStoreImpl = () => ReturnType<
  typeof useSelectedMoviesStore
>;
