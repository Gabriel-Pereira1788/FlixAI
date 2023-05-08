import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import StackPlaylist from '../View';
import {movies} from '../../../../mocks/movies';

describe('StackPlaylist', () => {
  it('render component correctly', () => {
    const {getByText, getAllByText} = render(
      <JestProviders>
        <StackPlaylist title="Titulo stack" listData={movies} />
      </JestProviders>,
    );
    const moviesElement = getAllByText('Teste');

    expect(moviesElement.length).toEqual(3);
    expect(getByText('Titulo stack')).toBeTruthy();
  });

  it('press function correctly', () => {
    const mockedPressfn = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <StackPlaylist
          title="Titulo stack"
          listData={movies}
          onPress={mockedPressfn}
        />
      </JestProviders>,
    );
    const element = getByTestId('stackElement');
    fireEvent.press(element);

    expect(mockedPressfn).toHaveBeenCalled();
  });
});
