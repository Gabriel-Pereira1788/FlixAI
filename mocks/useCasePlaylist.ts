import {PlaylistImpl} from '../src/repositories/database/useCases/Playlist/model';
import {movies} from './movies';
import {Realm} from '@realm/react';
export const allPlaylistMock: any = [
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

export const create = jest.fn();
export const deleteItem = jest.fn();
export const findMovieInPlaylist = jest.fn();
export const get = () => allPlaylistMock;
export const filtered = jest.fn();

export const mockUseCasePlaylist: PlaylistImpl = () => ({
  create,
  deleteItem,
  findMovieInPlaylist,
  get,
  filtered,
});
