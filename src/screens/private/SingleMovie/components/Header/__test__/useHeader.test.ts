import {renderHook} from '@testing-library/react-hooks';

import {movies} from '../../../../../../../mocks/movies';
import {mockUseCasePlaylist} from '../../../../../../../mocks/useCasePlaylist';
import {useHeader} from '../useHeader';

const {findMovieInPlaylist} = mockUseCasePlaylist();
describe('useHeader', () => {
  it('call hook correctly', () => {
    const {result} = renderHook(() =>
      useHeader({
        movie: movies[0],
        playlistImpl: {
          findMovieInPlaylist,
        },
      }),
    );

    expect(result.current.haveInPlaylist).toBeTruthy();
  });

  it('call hook with not have inPlaylist', () => {
    const findMovieInPlaylist = jest.fn().mockImplementation(() => ({
      dataMovie: null,
      dataPlaylist: [],
    }));
    const {result} = renderHook(() =>
      useHeader({
        movie: movies[0],
        playlistImpl: {
          findMovieInPlaylist,
        },
      }),
    );

    expect(result.current.haveInPlaylist).toBeFalsy();
    expect(result.current.playlist.length).toEqual(0);
  });
});
