import React from 'react';

import {Realm} from '@realm/react';
import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../mocks/movies';
import JestProviders from '../../../../providers/JestProviders';
import {UserLibraryViewModel} from '../types';
import UserLibrary from '../UserLibrary.view';

jest.useFakeTimers();

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
const handleSelectLibrary = jest.fn();
const fetchPlaylists = jest.fn();

const viewModelMock: UserLibraryViewModel = {
  allPlaylists: allPlaylistMock,
  fetchPlaylists,
  handleSelectLibrary,
};

describe('UserLibrary', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <UserLibrary viewModel={viewModelMock} />
      </JestProviders>,
    );

    expect(getByText('Biblioteca de filmes')).toBeTruthy();
  });

  it('call function search change', () => {
    const {getByTestId} = render(
      <JestProviders>
        <UserLibrary viewModel={viewModelMock} />
      </JestProviders>,
    );
    const button = getByTestId('buttonVisible');
    fireEvent.press(button);
    const input = getByTestId('input');
    fireEvent(input, 'onChange', {nativeEvent: {text: 'John doe'}});

    expect(fetchPlaylists).toBeCalledWith('John doe');
  });

  it('render libraries correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <UserLibrary viewModel={viewModelMock} />
      </JestProviders>,
    );
    const stackElements = getAllByTestId('stackElement');

    expect(stackElements.length).toEqual(2);
  });
});
