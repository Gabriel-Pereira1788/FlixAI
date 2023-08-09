import React from 'react';

import {movies} from '@mocks';
import {render} from '@testing-library/react-native';

import JestProviders from '../../../../../../../providers/JestProviders';
import {NewLibraryListMovies} from '../NewLibraryListMovies';
describe('NewLibraryListMovies', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <NewLibraryListMovies movies={movies} />
      </JestProviders>,
    );

    expect(getAllByTestId('select-card').length).toEqual(movies.length);
  });
});
