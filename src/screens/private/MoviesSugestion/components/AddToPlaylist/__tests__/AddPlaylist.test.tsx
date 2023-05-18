import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import AddToPlaylist from '../View';

describe('AddToPlaylist', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <AddToPlaylist />
      </JestProviders>,
    );

    expect(getByTestId('plus-icon')).toBeTruthy();
  });

  it('call press function correctly', () => {
    const mockedPressFn = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <AddToPlaylist onPress={mockedPressFn} />
      </JestProviders>,
    );
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(mockedPressFn).toBeCalled();
  });
});
