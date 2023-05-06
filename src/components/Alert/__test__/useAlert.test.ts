import {renderHook} from '@testing-library/react-native';
import React from 'react';
import {act} from 'react-test-renderer';
import {AlertConfig, AlertRef} from '../model';
import {useAlert} from '../useAlert';

const ref = React.createRef<AlertRef>();
describe('useAlert', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('call open function correclty', () => {
    const {result} = renderHook(() => useAlert({ref}));

    const alertConfig: AlertConfig = {
      isOpen: true,
      text: 'teste',
      status: 'success',
    };

    act(() => {
      result.current.open(alertConfig);
    });
    expect(result.current.alertConfig.isOpen).toEqual(alertConfig.isOpen);
    expect(result.current.alertConfig.text).toEqual(alertConfig.text);
    expect(result.current.alertConfig.status).toEqual(alertConfig.status);
  });

  it('call hide function correclty', () => {
    const {result} = renderHook(() => useAlert({ref}));

    act(() => {
      result.current.hide();
    });

    expect(result.current.alertConfig.isOpen).toEqual(false);
  });
});
