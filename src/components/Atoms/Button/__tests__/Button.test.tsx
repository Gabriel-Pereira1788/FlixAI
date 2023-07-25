import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Button from '../View';
import JestProviders from '../../../../providers/JestProviders';

describe('Button', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <Button>Confirm</Button>
      </JestProviders>,
    );

    const element = getByText('Confirm');

    expect(element).toBeTruthy();
  });
  it('render component with disabled state ', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Button isLoading={true}>Confirm</Button>
      </JestProviders>,
    );

    const element = getByTestId('button');

    expect(element.props.accessibilityState.disabled).toBeTruthy();
  });
  it('call press function correctly ', () => {
    const mockPressFn = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <Button onPress={mockPressFn}>Confirm</Button>
      </JestProviders>,
    );

    const element = getByTestId('button');
    fireEvent.press(element);

    expect(mockPressFn).toBeCalled();
  });
});
