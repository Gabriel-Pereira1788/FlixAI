import React from 'react';

import {movies} from '@mocks';
import {render} from '@testing-library/react-native';

import JestProviders from '../../../../../../../providers/JestProviders';
import {UserLibraryCreateCollectionList} from '../UserLibraryCreateCollectionList';
describe('UserCreateCollectionList', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <UserLibraryCreateCollectionList movies={movies} />
      </JestProviders>,
    );

    expect(getAllByTestId('select-card').length).toEqual(movies.length);
  });
});
