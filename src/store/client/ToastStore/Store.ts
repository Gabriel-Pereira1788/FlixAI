import {create} from 'zustand';

type Actions = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  open: (state: State) => void;
  hide: () => void;
};

interface State {
  text: string;
  status?: 'error' | 'success' | 'warning' | 'info';
  isOpen: boolean;
}

interface StoreProps {
  state: State;
  actions: Actions;
}

export const useStore = create<StoreProps>(set => ({
  state: {
    isOpen: false,
    text: '',
    status: 'success',
  },
  actions: {
    success(message) {
      set(() => ({
        state: {
          isOpen: true,
          text: message,
          status: 'success',
        },
      }));
    },
    error(message) {
      set(() => ({
        state: {
          isOpen: true,
          text: message,
          status: 'error',
        },
      }));
    },
    warning(message) {
      set(() => ({
        state: {
          isOpen: true,
          text: message,
          status: 'warning',
        },
      }));
    },
    info(message) {
      set(() => ({
        state: {
          isOpen: true,
          text: message,
          status: 'info',
        },
      }));
    },
    open(state) {
      set(() => ({
        state: state,
      }));
    },
    hide() {
      set(() => ({
        state: {
          isOpen: false,
          text: '',
          status: 'success',
        },
      }));
    },
  },
}));
