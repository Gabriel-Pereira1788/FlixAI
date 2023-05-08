import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import AllPlaylist from '../View';
import {AllPlaylistViewModel} from '../model';
import {Realm} from '@realm/react';
import {movies} from '../../../../../mocks/movies';

const allPlaylistMock: any = [
  {
    _id: new Realm.BSON.ObjectId(),
    name: 'Playlist 1',
    id: '1',
    title: 'Playlist Title 1',
    movies: movies,
  },
  {
    _id: new Realm.BSON.ObjectId(),
    name: 'Playlist 2',
    id: '2',
    title: 'Playlist Title 2',
    movies: movies,
  },
];

const handleChangeMock = jest.fn();
const handleSelectPlaylistMock = jest.fn();
const redirectScreenMock = jest.fn();
const useAllPlaylistMock: AllPlaylistViewModel = () => ({
  allPlaylists: allPlaylistMock,
  handleChangeText: handleChangeMock,
  handleSelectPlaylist: handleSelectPlaylistMock,
  redirectScreen: redirectScreenMock,
  searchText: '',
});

describe('AllPlaylist', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <AllPlaylist useAllPlaylist={useAllPlaylistMock} />
      </JestProviders>,
    );

    expect(getByText('Playlist')).toBeTruthy();
  });

  it('call function search change', () => {
    const {getByTestId} = render(
      <JestProviders>
        <AllPlaylist useAllPlaylist={useAllPlaylistMock} />
      </JestProviders>,
    );
    const button = getByTestId('buttonVisible');
    fireEvent.press(button);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'John doe');

    expect(handleChangeMock).toBeCalledWith('John doe');
  });

  it('render playlists correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <AllPlaylist useAllPlaylist={useAllPlaylistMock} />
      </JestProviders>,
    );
    const stackElements = getAllByTestId('stackElement');

    expect(stackElements.length).toEqual(2);
  });
});
