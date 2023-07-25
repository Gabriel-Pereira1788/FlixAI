import React from 'react';
import {Modal as ModalNative, Pressable} from 'react-native';
import {Box, RenderIF} from '@components/atoms';

import {ModalRefProps, ModalViewModel} from './model';
import {useModal as _useModal} from './useModal';
interface ModalProps {
  useModal?: ModalViewModel;
  children?: React.ReactNode;
}
export const modalRef = React.createRef<ModalRefProps>();

export function Modal({useModal = _useModal, children}: ModalProps) {
  const [ShowComponent, setShowComponent] = React.useState<JSX.Element>(<></>);

  const {configModal, hide} = useModal({modalRef, setShowComponent});

  return (
    <ModalNative
      testID="modal"
      transparent
      onRequestClose={hide}
      visible={configModal.isOpen}
      animationType={configModal.animationPreset}>
      <Pressable style={{flex: 1}} onPress={hide}>
        <Box
          flex={1}
          backgroundColor="transparent"
          alignItems="center"
          justifyContent="center">
          {ShowComponent}
          <RenderIF condition={configModal.isOpen}>
            {children && children}
          </RenderIF>
        </Box>
      </Pressable>
    </ModalNative>
  );
}
