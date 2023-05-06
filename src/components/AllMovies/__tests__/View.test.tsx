import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import AllMovies from '../View';
import {IDataMovie, Movie} from '../../../models/Movie';

const renderItemMock = jest.fn();

const movies: Movie[] = [
  {
    backdrop_path: 'www.example.com',
    id: 1,
    original_title: 'Teste Movie 1',
    overview: 'teste overview',
    poster_path: 'www.example.com',
    release_date: '21/12',
    title: 'Teste 1',
    name: 'teste 1',
    vote_average: 7.5,
    vote_count: 100,
    imdb_id: '...',
    genre_ids: [1, 2, 3],
  },
  {
    backdrop_path: 'www.example.com',
    id: 2,
    original_title: 'Teste Movie 2',
    overview: 'teste overview',
    poster_path: 'www.example.com',
    release_date: '21/12',
    title: 'Teste 2',
    name: 'teste 2',
    vote_average: 7.5,
    vote_count: 100,
    imdb_id: '...',
    genre_ids: [1, 2, 3],
  },
  {
    backdrop_path: 'www.example.com',
    id: 3,
    original_title: 'Teste Movie 3',
    overview: 'teste overview',
    poster_path: 'www.example.com',
    release_date: '31/13',
    title: 'Teste 3',
    name: 'teste 3',
    vote_average: 7.5,
    vote_count: 100,
    imdb_id: '...',
    genre_ids: [1, 2, 3],
  },
];

const dataMoviesMock: IDataMovie[] = [
  {
    identify: 'all',
    list: movies,
    title: 'Test',
  },
  {
    identify: 'action',
    list: movies,
    title: 'Test',
  },
];
describe('AllMovies', () => {
  it('render component correctly', () => {
    const {getAllByText} = render(
      <JestProviders>
        <AllMovies renderItem={renderItemMock} dataMovies={dataMoviesMock} />
      </JestProviders>,
    );

    const allDataList = getAllByText('Test');

    expect(allDataList.length).toEqual(2);
  });

  it('render children movies correclty', () => {
    render(
      <JestProviders>
        <AllMovies renderItem={renderItemMock} dataMovies={dataMoviesMock} />
      </JestProviders>,
    );

    expect(renderItemMock).toBeCalledTimes(6);
  });
});
