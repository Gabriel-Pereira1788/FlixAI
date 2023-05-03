import React from 'react';
import {AlertConfig, AlertViewModel} from './model';

export const useAlert: AlertViewModel = ({ref}) => {
  const [alertConfig, setAlertConfig] = React.useState<AlertConfig>({
    text: '',
    status: 'success',
    isOpen: false,
  });

  function open(config: AlertConfig) {
    setAlertConfig(prev => ({...prev, ...config}));
  }

  function hide() {
    setAlertConfig({
      text: '',
      isOpen: false,
      status: undefined,
    });
  }

  React.useImperativeHandle(ref, () => ({
    open,
    hide,
    isOpen: alertConfig.isOpen,
  }));

  React.useEffect(() => {
    if (alertConfig.isOpen) {
      setTimeout(() => {
        hide();
      }, 3000);
    }
  }, [alertConfig]);

  return {alertConfig, open, hide};
};
