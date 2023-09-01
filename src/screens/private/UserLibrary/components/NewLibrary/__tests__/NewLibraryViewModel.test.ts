import {useCollection} from '@database';
import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {movies} from '../../../../../../../mocks/movies';
import {create, mockImpl} from '../../../../../../../mocks/useCasePlaylist';
// import {useSelectedMoviesStore} from '../../../../../../store/client/SelectMovies/useSelectedMoviesStore';
import {useNewLibraryViewModel} from '../NewLibrary.viewModel';

// const mockSelectedStore = useSelectedMoviesStore as jest.MockedFunction<
//   typeof useSelectedMoviesStore
// >;

const addToSelected = jest.fn();
const cleanUp = jest.fn();
const removeToSelected = jest.fn();

const selectedMovies = movies.slice(0, 2);

const mockPlaylist = useCollection as jest.MockedFunction<typeof useCollection>;

const selectMoviesActions = () => ({
  addToSelected,
  cleanUp,
  removeToSelected,
});

const selectMoviesStore = () => selectedMovies;
jest.mock(
  '../../../../../../store/client/SelectMovies/useSelectedMoviesStore',
  () => ({
    useSelectedMoviesStore: selectMoviesStore,
    useSelectedMoviesActions: selectMoviesActions,
  }),
);
jest.mock('@database');

beforeAll(() => {
  mockPlaylist.mockImplementation(() => mockImpl);
});
describe('useNewLibraryViewModel', () => {
  it('call createLibrary method correctly', async () => {
    const {result} = renderHook(() => useNewLibraryViewModel({}));
    await act(async () => {
      await result.current.onCreateLibrary('Some title');
    });

    expect(create).toBeCalledWith({
      title: 'Some title',
      movies: selectedMovies,
    });

    expect(cleanUp).toBeCalled();
  });
});
