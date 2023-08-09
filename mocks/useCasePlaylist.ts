import {Realm} from '@realm/react';

import {PlaylistImpl} from '../src/repositories/database/useCases/Playlist/model';

import {movies} from './movies';
export const allPlaylistMock: any = [
  {
    _id: new Realm.BSON.ObjectId(),
    name: 'Playlist 1',
    id: '1',
    title: 'Playlist Title 1',
    movies: movies.slice(0, 2),
  },
  {
    _id: new Realm.BSON.ObjectId(),
    name: 'Playlist 2',
    id: '2',
    title: 'Playlist Title 2',
    movies: movies,
  },
];

export const create = jest.fn();
export const deleteItem = jest.fn();
export const findMovieInPlaylist = jest.fn().mockImplementation(() => ({
  dataMovie: movies[0],
  dataPlaylist: allPlaylistMock,
}));
export const get = () => allPlaylistMock;
export const filtered = jest
  .fn()
  .mockImplementation(() => [allPlaylistMock[0]]);

export const mockImpl = {
  create,
  deleteItem,
  findMovieInPlaylist,
  get,
  filtered,
};

export const mockUseCasePlaylist: PlaylistImpl = () => mockImpl;
