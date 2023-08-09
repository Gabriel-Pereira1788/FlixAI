import {useStore} from './Store';

export function useAlertStore() {
  const {
    state,
    actions: {hide, open, success, error, warning, info},
  } = useStore();

  return {
    state,
    hide,
    open,
    success,
    error,
    warning,
    info,
  };
}
