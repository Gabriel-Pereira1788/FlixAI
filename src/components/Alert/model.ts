import React from 'react';

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

interface HookAlertProps {
  ref: React.ForwardedRef<AlertRef>;
}
export type AlertViewModel = (props: HookAlertProps) => {
  alertConfig: AlertConfig;
  open: (config: AlertConfig) => void;
  hide: () => void;
};
