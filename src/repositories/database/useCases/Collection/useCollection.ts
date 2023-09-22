import React from 'react';

import {makeId, useDatabase, useGetQuery} from '@infra';
import {Movie, LibraryDTO} from '@models';
import uuid from 'react-native-uuid';

import {Collection} from '../../schemas/CollectionSchema';

import {CollectionImpl} from './model';

//TODO: Modificar nomenclatura para MoviesLibrary
export const useCollection: CollectionImpl = () => {
  const database = useDatabase();
  const playlists = useGetQuery(Collection);

  function get(): Realm.Results<Collection> {
    return playlists;
  }
  async function create(data: LibraryDTO) {
    database.create<LibraryDTO>('Collection', {
      _id: makeId(),
      id: String(uuid.v4()),
      title: data.title,
      movies: data.movies,
    });
  }

  function edit(data: LibraryDTO) {
    database.edit('Collection', {
      _id: data._id,
      title: data.title,
      movies: data.movies,
    });
  }

  async function removeMovieToCollection(
    selectedPlaylist: Collection,
    movieId: number,
  ) {
    if (selectedPlaylist) {
      const filteredMovies = selectedPlaylist.movies.filter(
        dataMovie => dataMovie.id !== movieId,
      );
      database.edit('Collection', {
        _id: selectedPlaylist._id,
        title: selectedPlaylist.title,
        movies: filteredMovies,
      });
    }
  }

  const findMovieInPlaylist = React.useCallback(
    (id: number) => {
      let dataMovie: Movie | null = null;
      let dataPlaylist: Collection[] = [];
      for (let playlist of playlists as Realm.Results<Collection>) {
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

  function filtered(query: string): Realm.Results<Collection> {
    return playlists.filtered(query);
  }

  return {
    edit,
    playlists,
    create,
    get,
    findMovieInPlaylist,
    removeMovieToCollection,
    filtered,
  };
};
