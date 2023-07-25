import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import StackMovies from '../View';
import {movies} from '../../../../../mocks/movies';

describe('StackMovies', () => {
  it('render component correctly', () => {
    const {getByText, getAllByTestId} = render(
      <JestProviders>
        <StackMovies title="Titulo stack" moviesList={movies} />
      </JestProviders>,
    );
    const moviesElement = getAllByTestId('movie');

    expect(moviesElement.length).toEqual(3);
    expect(getByText('Titulo stack')).toBeTruthy();
  });

  it('press function correctly', () => {
    const mockedPressfn = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <StackMovies
          title="Titulo stack"
          moviesList={movies}
          onPress={mockedPressfn}
        />
      </JestProviders>,
    );
    const element = getByTestId('stackElement');
    fireEvent.press(element);

    expect(mockedPressfn).toHaveBeenCalled();
  });
});
