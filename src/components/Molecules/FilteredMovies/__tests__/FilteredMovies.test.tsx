import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import FilteredMovies from '../View';
import {FilteredMoviesViewModel} from '../model';
import {IDataMovie, Movie} from '../../../../models/Movie';

const movies: Movie[] = [
  {
    backdrop_path: 'www.example.com',
    id: 1,
    original_title: 'Teste Movie 1',
    overview: 'teste overview',
    poster_path: 'www.example.com',
    release_date: '21/12',
    title: 'Teste1 1',
    name: 'teste1 1',
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
    title: 'Teste1 2',
    name: 'teste1 2',
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
    list: movies.slice(0, 2),
    title: 'Test',
  },
  {
    identify: 'action',
    list: movies,
    title: 'Test',
  },
];
const filter: Filter = {
  text: 'Teste1',
  category: 'all',
};

const useFilteredMoviesMock: FilteredMoviesViewModel = () => ({
  displayMovies: dataMoviesMock.filter(data => {
    return data.identify === filter.category;
  })[0].list,
});

const renderItemMock = jest.fn();
describe('FilteredMovies', () => {
  it('render component correctly', () => {
    const {} = render(
      <JestProviders>
        <FilteredMovies
          movies={dataMoviesMock}
          filter={filter}
          renderItem={renderItemMock}
          useFilteredMovies={useFilteredMoviesMock}
        />
      </JestProviders>,
    );

    expect(renderItemMock).toHaveBeenCalledTimes(2);
  });
});
