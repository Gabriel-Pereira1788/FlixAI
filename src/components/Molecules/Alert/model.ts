import React from 'react';
import {useAlert} from './useAlert';

export interface AlertConfig {
  text: string;
  status?: 'error' | 'success' | 'warning' | 'info';
  isOpen: boolean;
}

export interface AlertRef {
  isOpen: boolean;
  hide: () => void;
  open: (config: AlertConfig) => void;
}

export interface HookAlertProps {
  ref: React.ForwardedRef<AlertRef>;
}
export type AlertViewModel = (
  props: HookAlertProps,
) => ReturnType<typeof useAlert>;
