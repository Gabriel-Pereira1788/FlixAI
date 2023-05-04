import React from 'react';
import * as S from 'native-base';
import {ModalRefProps, ModalViewModel} from './model';
import {useModal as _useModal} from './useModal';

interface ModalProps {
  useModal?: ModalViewModel;
}

export const modalRef = React.createRef<ModalRefProps>();

export default function Modal({useModal = _useModal}: ModalProps) {
  const [ShowComponent, setShowComponent] = React.useState<React.FC>(() => (
    <></>
  ));

  const {configModal, hide} = useModal({modalRef, setShowComponent});

  return (
    <S.Modal testID="modal" onClose={hide} {...configModal}>
      {ShowComponent}
    </S.Modal>
  );
}
