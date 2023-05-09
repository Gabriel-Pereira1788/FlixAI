import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import List from '../View';
import {movies} from '../../../../../../../mocks/movies';
import {mockedNavigate} from '../../../../../../../jestSetup';
describe('List', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <List data={movies} />
      </JestProviders>,
    );
    const movieElements = getAllByTestId('card-movie');
    expect(movieElements.length).toEqual(movies.length);
  });

  it('redirect to Single movie correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <List data={movies} />
      </JestProviders>,
    );
    const movieElements = getAllByTestId('card-movie');
    fireEvent.press(movieElements[0]);
    expect(mockedNavigate).toBeCalledWith('SingleMovie', {
      idMovie: movies[0].id,
    });
  });
});
