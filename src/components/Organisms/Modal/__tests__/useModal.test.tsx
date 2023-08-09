import React from 'react';

import {act, renderHook} from '@testing-library/react-hooks';
import {Text} from 'native-base';

import {useModal} from '../useModal';
import {modalRef} from '../View';

const setShowComponentMock = jest.fn();

const mockComponent: JSX.Element = <Text>teste</Text>;

describe('useModal', () => {
  it('visible property init false', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    expect(result.current.configModal.isOpen).toBeFalsy();
  });

  it('set component to visible', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    act(() => {
      modalRef.current?.show(mockComponent);
    });

    expect(result.current.configModal.isOpen).toBeTruthy();
    expect(setShowComponentMock).toHaveBeenCalled();
  });

  it('call hide function', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    act(() => {
      result.current.hide();
    });

    expect(result.current.configModal.isOpen).toBeFalsy();
  });
});
