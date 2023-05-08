import {renderHook} from '@testing-library/react-hooks';
import {allPlaylistMock} from '../../../../../mocks/useCasePlaylist';
import {useListMovies} from '../useListMovies';

describe('useListMovies', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() =>
      useListMovies({
        idPlaylist: allPlaylistMock[0]._id,
      }),
    );
  });
});
