import React from 'react';
import {render} from '@testing-library/react-native';

import Alert from '../View';
import {AlertConfig, AlertRef, AlertViewModel} from '../model';
import JestProviders from '../../../../providers/JestProviders';

const hideMock = jest.fn();
const openMock = jest.fn();
const alertConfigMock: AlertConfig = {
  isOpen: true,
  status: 'warning',
  text: 'Alert message',
};

const ref = React.createRef<AlertRef>();

const useAlertMock: AlertViewModel = () => ({
  alertConfig: alertConfigMock,
  hide: hideMock,
  open: openMock,
});
describe('Alert', () => {
  it('should render with opened alert', () => {
    const containerStyle = {backgroundColor: 'red'};

    const {getByText, getByTestId} = render(
      <JestProviders>
        <Alert
          ref={ref}
          containerStyle={containerStyle}
          useAlert={useAlertMock}
        />
      </JestProviders>,
    );

    const icon = getByTestId('icon-status');
    const alert = getByTestId('alert');

    expect(getByText(alertConfigMock.text)).toBeTruthy();
    expect(icon).toBeDefined();
    expect(alert).toBeDefined();
    expect(alert.props.style[1].backgroundColor).toEqual('red');
  });

  it('shoul render with not opened alert', () => {
    const useAlertMockFalse: AlertViewModel = () => ({
      alertConfig: {
        isOpen: false,
        status: 'warning',
        text: 'Alert message',
      },
      hide: hideMock,
      open: openMock,
    });
    const {queryByTestId} = render(
      <JestProviders>
        <Alert ref={ref} useAlert={useAlertMockFalse} />
      </JestProviders>,
    );

    const icon = queryByTestId('icon-status');
    const alert = queryByTestId('alert');

    expect(icon).toBeNull();
    expect(alert).toBeNull();
  });

  it('render with status success', () => {
    const useAlertMock: AlertViewModel = () => ({
      alertConfig: {
        isOpen: true,
        status: 'success',
        text: 'teste',
      },
      hide: hideMock,
      open: openMock,
    });
    const {getByTestId} = render(
      <JestProviders>
        <Alert ref={ref} useAlert={useAlertMock} />
      </JestProviders>,
    );
    // - sucess
    //'#fed7aa' - warning
    const alertContainer = getByTestId('alertContainer');

    console.log();

    expect(alertContainer.props.style.backgroundColor).toEqual('#bbf7d0');
  });

  it('render with status warning', () => {
    const useAlertMock: AlertViewModel = () => ({
      alertConfig: {
        isOpen: true,
        status: 'warning',
        text: 'teste',
      },
      hide: hideMock,
      open: openMock,
    });
    const {getByTestId} = render(
      <JestProviders>
        <Alert ref={ref} useAlert={useAlertMock} />
      </JestProviders>,
    );

    const alertContainer = getByTestId('alertContainer');

    console.log();

    expect(alertContainer.props.style.backgroundColor).toEqual('#fed7aa');
  });
});
