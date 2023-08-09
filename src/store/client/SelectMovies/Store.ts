import {create} from 'zustand';

import {Movie} from '../../../models/Movie';

type Actions = {
  addToSelected: (movie: Movie) => void;
  removeToSelected: (movie: Movie) => void;
  cleanUp: () => void;
};
interface State {
  selectedMovies: Movie[];
}

interface StoreProps {
  state: State;
  actions: Actions;
}

export const useStore = create<StoreProps>(set => ({
  state: {
    selectedMovies: [],
  },
  actions: {
    addToSelected(movie) {
      set(state => ({
        state: {
          selectedMovies: [...state.state.selectedMovies, movie],
        },
      }));
    },
    removeToSelected(movie) {
      set(state => ({
        state: {
          selectedMovies: state.state.selectedMovies.filter(
            selected => selected.id !== movie.id,
          ),
        },
      }));
    },
    cleanUp() {
      set(() => ({
        state: {
          selectedMovies: [],
        },
      }));
    },
  },
}));
