import React from 'react';

import {makeId, useDatabase, useGetQuery} from '@infra';
import {Movie, LibraryDTO} from '@models';
import uuid from 'react-native-uuid';

import {Playlist} from '../../schemas/PlaylistSchema';

import {PlaylistImpl} from './model';

//TODO: Modificar nomenclatura para MoviesLibrary
export const usePlaylist: PlaylistImpl = () => {
  const database = useDatabase();
  const playlists = useGetQuery(Playlist);
  function get(): Realm.Results<Playlist> {
    return playlists;
  }
  async function create(data: LibraryDTO) {
    database.create<LibraryDTO>('Playlist', {
      _id: makeId(),
      id: String(uuid.v4()),
      title: data.title,
      movies: data.movies,
    });
  }

  async function deleteItem(id: string | number) {
    console.log(id);
  }

  const findMovieInPlaylist = React.useCallback(
    (id: number) => {
      let dataMovie: Movie | null = null;
      let dataPlaylist: Playlist[] = [];
      for (let playlist of playlists as Realm.Results<Playlist>) {
        const findedMovie = playlist.movies.find(movie => movie.id === id);

        if (findedMovie) {
          dataMovie = findedMovie;
          dataPlaylist.push(playlist);
          break;
        }
      }

      return {
        dataMovie,
        dataPlaylist,
      };
    },
    [playlists],
  );

  function filtered(query: string): Realm.Results<Playlist> {
    return playlists.filtered(query);
  }

  return {
    playlists,
    create,
    get,
    findMovieInPlaylist,
    deleteItem,
    filtered,
  };
};
