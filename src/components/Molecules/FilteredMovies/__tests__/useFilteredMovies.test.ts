import {renderHook} from '@testing-library/react-hooks';

import {IDataMovie, Movie} from '../../../../models/Movie';
import {useFilteredMovies} from '../useFilteredMovies';

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
    list: movies,
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

const useMoviesByGenre = jest
  .fn()
  .mockReturnValue({data: dataMoviesMock[1].list});
describe('useFilteredMovies', () => {
  it('returns all movies when filter is set to "all"', () => {
    const {result} = renderHook(() =>
      useFilteredMovies({
        movies: dataMoviesMock,
        filter: {...filter, text: ''},
        useMoviesByGenreImpl: useMoviesByGenre,
      }),
    );
    expect(result.current.displayMovies.length).toEqual(3);
  });

  it('filters movies by title', () => {
    const {result} = renderHook(() =>
      useFilteredMovies({
        movies: dataMoviesMock,
        filter: {...filter, text: 'Teste1'},
        useMoviesByGenreImpl: useMoviesByGenre,
      }),
    );

    expect(result.current.displayMovies.length).toEqual(2);
    expect(
      result.current.displayMovies[0].title.startsWith('Teste1'),
    ).toBeTruthy();
  });

  it('filters movies by genre', () => {
    const {result} = renderHook(() =>
      useFilteredMovies({
        movies: dataMoviesMock,
        filter: {...filter, category: 'action'},
        useMoviesByGenreImpl: useMoviesByGenre,
      }),
    );
    expect(result.current.displayMovies.length).toEqual(2);
    expect(useMoviesByGenre).toHaveBeenCalledWith('action');
  });
});
