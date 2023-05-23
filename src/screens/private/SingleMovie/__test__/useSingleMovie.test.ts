import {renderHook} from '@testing-library/react-hooks';
import {useSingleMovie} from '../useSingleMovie';
import {SingleMovieImpl} from '../../../../store/server/useSingleMovie';
import {movies} from '../../../../../mocks/movies';
import {act} from 'react-test-renderer';
import {useFocusedScreen} from '../../../../helpers/hooks/useFocusedScreen';

const mockUseFocusedScreen = useFocusedScreen as jest.Mock<
  ReturnType<typeof useFocusedScreen>
>;
jest.mock('../../../../helpers/hooks/useFocusedScreen');

const mockUseSingeMovieServer: SingleMovieImpl = () => ({
  data: movies[0],
  isLoading: false,
  error: null,
});

describe('useSingleMovie', () => {
  beforeAll(() => {
    mockUseFocusedScreen.mockImplementation(() => ({
      focused: true,
    }));
  });
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      useSingleMovie({
        id: 1,
        useSingleMovieImpl: mockUseSingeMovieServer,
      }),
    );

    expect(result.current.dataMovie?.id).toEqual(movies[0].id);
  });

  it('call toggle most view for more information about the movie', () => {
    const {result} = renderHook(() =>
      useSingleMovie({
        id: 1,
        useSingleMovieImpl: mockUseSingeMovieServer,
      }),
    );

    act(() => {
      result.current.toggleMostView(60);
    });

    expect(result.current.stylesAnimation.flex).toEqual(1);
    expect(result.current.styleRotate.transform[0].rotate).toEqual('0deg');
  });

  it('call toggle most view for resume information about the movie', () => {
    const {result} = renderHook(() =>
      useSingleMovie({
        id: 1,
        useSingleMovieImpl: mockUseSingeMovieServer,
      }),
    );

    act(() => {
      result.current.toggleMostView(-20);
    });

    expect(result.current.valueAnimated).toEqual({value: 'full'});
  });
});
