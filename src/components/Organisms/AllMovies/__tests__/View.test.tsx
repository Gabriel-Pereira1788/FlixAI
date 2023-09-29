import React from 'react';

import {render} from '@testing-library/react-native';

import {dataMoviesMock} from '../../../../../mocks/movies';
import JestProviders from '../../../../providers/JestProviders';
import {AllMovies} from '../View';

describe('AllMovies', () => {
  it('render component correctly', () => {
    const renderItemMock = jest.fn();
    const {getAllByText} = render(
      <JestProviders>
        <AllMovies renderItem={renderItemMock} dataMovies={dataMoviesMock} />
      </JestProviders>,
    );

    const allDataList = getAllByText('Test');

    expect(allDataList.length).toEqual(2);
  });

  it('render children movies correclty', () => {
    const renderItemMock = jest.fn();
    render(
      <JestProviders>
        <AllMovies renderItem={renderItemMock} dataMovies={dataMoviesMock} />
      </JestProviders>,
    );

    expect(renderItemMock).toBeCalledTimes(6);
  });
});
