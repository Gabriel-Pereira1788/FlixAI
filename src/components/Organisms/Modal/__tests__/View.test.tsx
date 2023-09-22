import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Button} from '../../../Atoms/Button/View';
import {Text} from '../../../Atoms/Text/View';
import {ModalConfig, ModalViewModel} from '../model';
import {Modal} from '../View';

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
          <Text>Teste</Text>
        </Modal>
      </JestProviders>,
    );

    expect(getByText('Teste')).toBeTruthy();
  });

  it('call hide function to close modal', () => {
    const {getByText} = render(
      <JestProviders>
        <Modal useModal={_useModalMock}>
          <Text>Teste</Text>
          <Button onPress={hideMock}>Closed</Button>
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
            <Text>Teste</Text>
          </Modal>
        </JestProviders>,
      );

      expect(queryByText('modal')).toBeNull();
    });
  });
});
