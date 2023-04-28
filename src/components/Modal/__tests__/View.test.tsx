import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import WrapperProvider from '../../WrapperProvider';
import Modal from '../View';
import {ModalViewModel} from '../model';

import * as S from 'native-base';

const hideMock = jest.fn();

const _useModalMock: ModalViewModel = () => ({
  hide: hideMock,
  visible: true,
});

describe('Modal', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <WrapperProvider>
        <Modal useModal={_useModalMock}>
          <S.Modal.Content>
            <S.Text>Teste</S.Text>
          </S.Modal.Content>
        </Modal>
      </WrapperProvider>,
    );

    expect(getByText('Teste')).toBeTruthy();
  });

  it('call hide function to close modal', () => {
    const {getByText} = render(
      <WrapperProvider>
        <Modal useModal={_useModalMock}>
          <S.Modal.Content>
            <S.Text>Teste</S.Text>
            <S.Button onPress={hideMock}>Closed</S.Button>
          </S.Modal.Content>
        </Modal>
      </WrapperProvider>,
    );

    fireEvent.press(getByText('Closed'));

    expect(hideMock).toBeCalled();
  });

  describe('render without visible', () => {
    it('render component without visible', () => {
      const _useModalInternal: ModalViewModel = () => ({
        hide: hideMock,
        visible: false,
      });
      const {queryByTestId} = render(
        <WrapperProvider>
          <Modal useModal={_useModalInternal}>
            <S.Modal.Content>
              <S.Text>Teste</S.Text>
            </S.Modal.Content>
          </Modal>
        </WrapperProvider>,
      );

      expect(queryByTestId('modal')).toBeNull();
    });
  });
});
