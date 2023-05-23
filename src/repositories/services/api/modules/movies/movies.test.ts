import {render, waitFor} from '@testing-library/react-native';
import {Movies} from './movies';
const api = {
  get: jest.fn(url => {
    if (url.includes('/movie/popular')) {
      return Promise.resolve({data: {results: [{id: 1, title: 'Movie 1'}]}});
    }
    if (url.includes('/movie/top_rated')) {
      return Promise.resolve({data: {results: [{id: 2, title: 'Movie 2'}]}});
    }
    if (url.includes('/discover/movie')) {
      return Promise.resolve({data: {results: [{id: 3, title: 'Movie 3'}]}});
    }
    if (url.includes('/search/movie')) {
      return Promise.resolve({data: {results: [{id: 4, title: 'Movie 4'}]}});
    }
    if (url.includes('/movie/')) {
      return Promise.resolve({data: {cast: [{name: 'Actor 1'}]}});
    }
    return Promise.resolve({data: {}});
  }),
};

jest.mock('../../../../../helpers/constants/tmdb', () => ({
  TMDB_GENRES: [
    {identify: 'popular', id: 1},
    {identify: 'top', id: 2},
    // Add other genre mocks if needed
  ],
}));
jest.mock('../../api', () => ({
  api,
}));

describe('Movies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getByGenre should return movies by genre', async () => {
    const movies = new Movies();
    const popularMovies = await movies.getByGenre('popular');
    const topMovies = await movies.getByGenre('top');
    const actionMovies = await movies.getByGenre('action');

    expect(popularMovies).toEqual([{id: 1, title: 'Movie 1'}]);
    expect(topMovies).toEqual([{id: 2, title: 'Movie 2'}]);
    expect(actionMovies).toEqual([{id: 3, title: 'Movie 3'}]);
    expect(api.get).toHaveBeenCalledTimes(3);
  });

  test('getByName should return a movie by name', async () => {
    const movies = new Movies();
    const movie = await movies.getByName('Movie Name');

    expect(movie).toEqual({id: 4, title: 'Movie 4'});
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      '/search/movie?api_key=API_KEY&language=pt-BR&query=Movie%20Name',
    );
  });

  test('getAllByName should return movies for multiple names', async () => {
    const movies = new Movies();
    const movieNames = ['Movie 1', 'Movie 2'];
    const moviesList = await movies.getAllByName(movieNames);

    expect(moviesList).toEqual([{id: 4, title: 'Movie 4'}]);
    expect(api.get).toHaveBeenCalledTimes(2);
  });

  test('findById should return a movie by id', async () => {
    const movies = new Movies();
    const movie = await movies.findById(5);

    expect(movie).toEqual({id: 5, title: 'Movie 5', cast: [{name: 'Actor 1'}]});
    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith(
      '/movie/5?api_key=API_KEY&language=pt-BR',
    );
  });
});
