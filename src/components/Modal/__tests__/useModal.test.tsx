import React from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import {useModal} from '../useModal';
import {modalRef} from '../View';
import {Text} from 'native-base';

const setShowComponentMock = jest.fn();

const mockComponent: React.FC = () => <Text>teste</Text>;

describe('useModal', () => {
  it('visible property init false', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    expect(result.current.visible).toBeFalsy();
  });

  it('set component to visible', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    act(() => {
      modalRef.current?.show(mockComponent);
    });

    expect(result.current.visible).toBeTruthy();
    expect(setShowComponentMock).toHaveBeenCalled();
  });

  it('call hide function', () => {
    const {result} = renderHook(() =>
      useModal({modalRef, setShowComponent: setShowComponentMock}),
    );

    act(() => {
      result.current.hide();
    });

    expect(result.current.visible).toBeFalsy();
  });
});
