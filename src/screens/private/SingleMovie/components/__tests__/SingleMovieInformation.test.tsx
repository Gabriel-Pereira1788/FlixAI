import React from 'react';

import {render} from '@testing-library/react-native';
import {makeVoteAverage} from '@utils';

import {movies} from '../../../../../../mocks/movies';
import JestProviders from '../../../../../providers/JestProviders';
import {SingleMovieInformation} from '../SingleMovieInformation';

describe('SingleMovieInformation', () => {
  it('render component correctly', () => {
    const vote = makeVoteAverage(movies[0].vote_count, movies[0].vote_average);
    const {getByText, getByTestId} = render(
      <JestProviders>
        <SingleMovieInformation movie={movies[0]} />
      </JestProviders>,
    );

    expect(getByText(movies[0].title)).toBeTruthy();

    expect(getByText(movies[0].overview)).toBeTruthy();
    expect(`${vote.toFixed(2)} ${movies[0].vote_count}`).toBeTruthy();
    expect(getByTestId('star-icon').children.length > 0).toBeTruthy();
  });
});
