import {TMDB_GENRES} from '@constants';
import {GetAllMoviesImpl, useGetAllMovies} from '@domain';
import {dataMoviesMock} from '@mocks';
import {Genre} from '@models';
import {act, renderHook} from '@testing-library/react-native';

import {useMoviesViewModel} from '../Movies.viewModel';
const useGetAllMoviesMock = useGetAllMovies as jest.Mock<GetAllMoviesImpl>;
jest.mock('../../../../repositories/domain/movies/useCases/useGetAllMovies');

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));

beforeAll(() => {
  useGetAllMoviesMock.mockImplementation(() => ({
    data: dataMoviesMock,
    error: null,
    isLoading: false,
  }));
});

const categories = TMDB_GENRES.filter(genre => !!genre.identify);
const categoriesMock = [
  {name: 'Todos', identify: 'all', id: 1} as Genre,
  ...categories,
];
describe('MoviesViewModel', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() => useMoviesViewModel());

    expect(result.current.dataMovies?.length).toEqual(dataMoviesMock.length);
    expect(result.current.categories).toEqual(categoriesMock);
    expect(result.current.filter).toEqual({text: '', category: 'all'});
  });
  it('call handleFilter function correctly', () => {
    const {result} = renderHook(() => useMoviesViewModel());

    act(() => {
      result.current.handleFilter({text: 'John doe', category: 'action'});
    });

    expect(result.current.filter).toEqual({
      text: 'John doe',
      category: 'action',
    });
  });
});
