import {useStore} from './Store';

export function useToastStore() {
  const {isOpen, text, status} = useStore(state => state.state);
  return {
    isOpen,
    text,
    status,
  };
}

export function useToastActions() {
  return useStore(state => state.actions);
}
