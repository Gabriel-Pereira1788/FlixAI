import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import Header from '../View';
import {movies} from '../../../../../../../mocks/movies';

import {
  allPlaylistMock,
  mockUseCasePlaylist,
} from '../../../../../../../mocks/useCasePlaylist';
import {HeaderViewModel} from '../model';

const mockUseHeader: HeaderViewModel = () => ({
  haveInPlaylist: true,
  playlist: allPlaylistMock,
});
const {findMovieInPlaylist} = mockUseCasePlaylist();
describe('Header', () => {
  it('render component with haveInPlaylist', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Header
          movie={movies[0]}
          useHeaderImpl={mockUseHeader}
          playlistImpl={{
            findMovieInPlaylist,
          }}
        />
      </JestProviders>,
    );
    const containerIcon = getByTestId('container-icon');
    expect(containerIcon).toBeTruthy();
    const hearthIcon = containerIcon.children[0];
    expect(hearthIcon.props.weight).toEqual('fill');
  });

  it('render component not haveInPlaylist', () => {
    const mockUseHeader: HeaderViewModel = () => ({
      haveInPlaylist: false,
      playlist: allPlaylistMock,
    });
    const {getByTestId} = render(
      <JestProviders>
        <Header
          movie={movies[0]}
          useHeaderImpl={mockUseHeader}
          playlistImpl={{
            findMovieInPlaylist,
          }}
        />
      </JestProviders>,
    );
    const containerIcon = getByTestId('container-icon');
    expect(containerIcon).toBeTruthy();
    const hearthIcon = containerIcon.children[0];
    expect(hearthIcon.props.weight).toEqual('bold');
  });
});
