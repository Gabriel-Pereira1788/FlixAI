import React from 'react';
import {ModalConfig, ModalViewModel} from './model';

export const useModal: ModalViewModel = ({modalRef, setShowComponent}) => {
  const [configModal, setConfigModal] = React.useState<ModalConfig>({
    isOpen: false,
    animationPreset: 'fade',
  });

  function hide() {
    setConfigModal(prev => ({...prev, isOpen: false}));
  }

  console.log(configModal);

  function show(
    Component: React.FC,
    animationPreset: 'fade' | 'slide' = 'slide',
  ) {
    setShowComponent(Component);
    setConfigModal({
      isOpen: true,
      animationPreset,
    });
  }

  React.useImperativeHandle(modalRef, () => ({
    hide,
    show,
    isOpen: configModal.isOpen,
  }));

  return {configModal, hide};
};
