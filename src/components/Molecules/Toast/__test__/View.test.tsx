import React from 'react';

import {render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

import {toastActionsMock} from '../../../../../mocks/toastActionsMock';
import JestProviders from '../../../../providers/JestProviders';
import {
  useToastStore,
  useToastActions,
} from '../../../../store/client/ToastStore/useToastStore';
import {Toast} from '../Toast.view';

const useToastStoreMock = useToastStore as jest.Mock<
  ReturnType<typeof useToastStore>
>;
const useToastActionsMock = useToastActions as jest.Mock<
  ReturnType<typeof useToastActions>
>;
jest.mock('../../../../store/client/ToastStore/useToastStore');

const alertConfigMock: any = {
  isOpen: true,
  status: 'success',
  text: 'alert message',
};

beforeEach(() => {
  useToastStoreMock.mockImplementation(() => alertConfigMock);
  useToastActionsMock.mockImplementation(() => toastActionsMock);
});

describe('Alert', () => {
  it('should render with opened alert', () => {
    const containerStyle = {backgroundColor: 'red'};

    const {getByTestId} = render(
      <JestProviders>
        <Toast containerStyle={containerStyle} />
      </JestProviders>,
    );

    const alert = getByTestId('alert');

    expect(alert).toBeDefined();
    expect(alert.props.style[1].backgroundColor).toEqual('red');
  });

  afterEach(() => {
    useToastStoreMock.mockClear();
  });

  it('shoul render with not opened alert', () => {
    useToastStoreMock.mockImplementation(() => ({
      isOpen: false,
      status: 'warning',
      text: 'teste',
    }));
    const {queryByTestId} = render(
      <JestProviders>
        <Toast />
      </JestProviders>,
    );

    const alert = queryByTestId('alert');

    expect(alert).toBeNull();
  });
  afterEach(() => {
    useToastStoreMock.mockClear();
  });

  it('render with status success', () => {
    useToastStoreMock.mockImplementation(() => ({
      ...alertConfigMock,
      isOpen: true,
      status: 'success',
      text: 'teste',
    }));
    const {getByTestId} = render(
      <JestProviders>
        <Toast />
      </JestProviders>,
    );

    const alertContainer = getByTestId('alertContainer');

    const style = alertContainer.props.style[1][0];

    expect(true).toBeTruthy();
    expect(style.backgroundColor).toEqual('#BAF7D0');
  });

  afterEach(() => {
    useToastStoreMock.mockClear();
  });

  it('render with status warning', () => {
    useToastStoreMock.mockImplementation(() => ({
      ...alertConfigMock,
      isOpen: true,
      status: 'warning',
      text: 'teste',
    }));

    const {getByTestId} = render(
      <JestProviders>
        <Toast />
      </JestProviders>,
    );

    const alertContainer = getByTestId('alertContainer');
    const style = alertContainer.props.style[1][0];
    expect(style.backgroundColor).toEqual('#ffa700');
  });

  it('render toast and after close by timeout', () => {
    useToastStoreMock.mockImplementation(() => ({
      ...alertConfigMock,
      isOpen: true,
      status: 'success',
      text: 'teste',
    }));

    jest.useFakeTimers();

    const {queryByTestId} = render(
      <JestProviders>
        <Toast />
      </JestProviders>,
    );

    const alert = queryByTestId('alert');
    expect(alert).toBeDefined();

    act(() => {
      jest.runAllTimers();
    });

    expect(toastActionsMock.hide).toBeCalled();
  });
});
