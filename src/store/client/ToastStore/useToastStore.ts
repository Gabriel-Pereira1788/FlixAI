import {useStore} from './Store';

export function useToastStore() {
  return useStore(state => state.state);
}

export function useToastActions() {
  return useStore(state => state.actions);
}
