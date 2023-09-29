import {useToastActions} from '@store';

const error = jest.fn();
const hide = jest.fn();
const info = jest.fn();
const open = jest.fn();
const success = jest.fn();
const warning = jest.fn();

export const toastActionsMock: ReturnType<typeof useToastActions> = {
  error,
  hide,
  info,
  open,
  success,
  warning,
};
