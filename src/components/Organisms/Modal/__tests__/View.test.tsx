import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Modal from '../View';
import {ModalConfig, ModalViewModel} from '../model';

import * as S from 'native-base';
import JestProviders from '../../../../providers/JestProviders';

const hideMock = jest.fn();

const configModal: ModalConfig = {
  animationPreset: 'slide',
  isOpen: true,
};

const _useModalMock: ModalViewModel = () => ({
  hide: hideMock,
  configModal,
});

describe('Modal', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <Modal useModal={_useModalMock}>
          <S.Modal.Content>
            <S.Text>Teste</S.Text>
          </S.Modal.Content>
        </Modal>
      </JestProviders>,
    );

    expect(getByText('Teste')).toBeTruthy();
  });

  it('call hide function to close modal', () => {
    const {getByText} = render(
      <JestProviders>
        <Modal useModal={_useModalMock}>
          <S.Modal.Content>
            <S.Text>Teste</S.Text>
            <S.Button onPress={hideMock}>Closed</S.Button>
          </S.Modal.Content>
        </Modal>
      </JestProviders>,
    );

    fireEvent.press(getByText('Closed'));

    expect(hideMock).toBeCalled();
  });

  describe('render without visible', () => {
    it('render component without visible', () => {
      const _useModalInternal: ModalViewModel = () => ({
        hide: hideMock,
        configModal: {
          animationPreset: 'slide',
          isOpen: false,
        },
      });
      const {queryByText} = render(
        <JestProviders>
          <Modal useModal={_useModalInternal}>
            <S.Modal.Content>
              <S.Text>Teste</S.Text>
            </S.Modal.Content>
          </Modal>
        </JestProviders>,
      );

      expect(queryByText('modal')).toBeNull();
    });
  });
});
