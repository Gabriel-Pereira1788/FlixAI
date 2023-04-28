import {Realm} from '@realm/react';
import {useQueryRealm, useRealm} from '../../../../../repositories/database/db';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';
import React from 'react';
import {AddModalViewModel} from './models';

export const useAddModal: AddModalViewModel = ({movie}) => {
  const [idPlaylist, setIdPlaylist] = React.useState<string>('');
  const results = useQueryRealm(Playlist);
  const realm = useRealm();

  const dataPlaylist: Realm.Results<Playlist> = React.useMemo(() => {
    return results;
  }, [results]);

  function handleChange(value: string) {
    setIdPlaylist(value);
  }

  function onAdd() {
    const playlist = results.find(value => {
      return value.title === idPlaylist;
    });

    console.log(playlist);

    const haveInPlaylist = playlist
      ? playlist?.movies.find(dataMovie => dataMovie.id === movie.id)
      : null;
    if (!!haveInPlaylist === false) {
      realm.write(() => {
        if (playlist && playlist.movies) {
          playlist.movies = [...playlist.movies, movie];
        }
      });
    } else {
      console.log('have in playlist');
    }
  }

  console.log('id', idPlaylist);

  return {dataPlaylist, idPlaylist, handleChange, onAdd};
};
