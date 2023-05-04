import React from 'react';
import {Movie} from '../../../../models/Movie';
import {PlaylistDTO} from '../../../../models/Playlist';
import {useQueryRealm, useRealm} from '../../db';
import {Playlist} from '../../schemas/PlaylistSchema';
import {PlaylistImpl} from './model';
import uuid from 'react-native-uuid';

export const usePlaylist: PlaylistImpl = () => {
  const realm = useRealm();
  const playlists = useQueryRealm(Playlist);
  function get(): Realm.Results<Playlist> {
    return playlists;
  }
  async function create(data: PlaylistDTO) {
    realm.write(() => {
      realm.create<PlaylistDTO>('Playlist', {
        _id: new Realm.BSON.ObjectID(),
        id: String(uuid.v4()),
        title: data.title,
        movies: data.movies,
      });
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

  return {
    playlists,
    create,
    get,
    findMovieInPlaylist,
    deleteItem,
  };
};
