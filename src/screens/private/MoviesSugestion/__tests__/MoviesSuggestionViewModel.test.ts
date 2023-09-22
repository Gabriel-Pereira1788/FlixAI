import {AssistantSuggestionServiceImpl} from '@domain';
import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import {movies} from '../../../../../mocks/movies';
import {useGetSuggestions} from '../../../../repositories/domain/assistantSuggestion/useCases/useGetSuggestions';
import {useMoviesSuggestionViewModel} from '../MoviesSuggestions.viewModel';

const mockGetSuggestions = useGetSuggestions as jest.Mock<
  ReturnType<typeof useGetSuggestions>
>;

jest.mock(
  '../../../../repositories/domain/assistantSuggestion/useCases/useGetSuggestions',
);

const mockUseSugestion: AssistantSuggestionServiceImpl = {
  error: null,
  data: {
    text: 'Hello John Doe',
    movies: movies,
  },
  isLoading: false,
};

beforeAll(() => {
  mockGetSuggestions.mockImplementation(() => mockUseSugestion);
});
describe('useMoviesSugestion', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() => useMoviesSuggestionViewModel());

    expect(result.current.moviesList).toEqual(movies);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toEqual(mockUseSugestion.error);
    expect(result.current.message).toEqual(mockUseSugestion.data?.text);
  });

  it('call on search function', () => {
    const {result} = renderHook(() => useMoviesSuggestionViewModel());

    act(() => {
      result.current.listenEventSearch('John doe');
    });

    expect(result.current.messageData.text).toEqual('John doe');
  });

  it('redirect to Single Movie screen', () => {
    const {result} = renderHook(() => useMoviesSuggestionViewModel());

    act(() => {
      result.current.redirectScreen(1)();
    });

    expect(mockedNavigate).toBeCalledWith('SingleMovie', {
      idMovie: 1,
    });
  });
});
