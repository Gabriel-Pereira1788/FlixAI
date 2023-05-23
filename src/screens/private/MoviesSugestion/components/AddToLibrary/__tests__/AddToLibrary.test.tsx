import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import AddToLibrary from '../View';

describe('AddToLibrary', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <AddToLibrary />
      </JestProviders>,
    );

    expect(getByTestId('plus-icon')).toBeTruthy();
  });

  it('call press function correctly', () => {
    const mockedPressFn = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <AddToLibrary onPress={mockedPressFn} />
      </JestProviders>,
    );
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(mockedPressFn).toBeCalled();
  });
});
