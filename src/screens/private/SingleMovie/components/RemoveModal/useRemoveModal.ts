import React from 'react';
import {modalRef} from '../../../../../components/Organisms/Modal/View';
import {useRealm} from '../../../../../repositories/database/db';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';
import {HookProps} from './model';

export const useRemoveModal = ({
  playlist,
  movie,
  useRealmImpl = useRealm,
}: HookProps) => {
  const realm = useRealmImpl();

  const [selectedPlaylist, setSelectedPlaylist] =
    React.useState<Playlist | null>(null);

  function handleChange(id: string) {
    const findedPlaylist = playlist.find(data => data.id === id);
    console.log('findedPlaylist', findedPlaylist);
    if (findedPlaylist) {
      setSelectedPlaylist(findedPlaylist);
    }
  }
  function onRemove() {
    if (selectedPlaylist) {
      realm.write(() => {
        const filteredMovies = selectedPlaylist.movies.filter(
          dataMovie => dataMovie.id !== movie.id,
        );
        realm.create(
          'Playlist',
          {
            _id: selectedPlaylist._id,
            title: selectedPlaylist.title,
            movies: filteredMovies,
          },
          Realm.UpdateMode.Modified,
        );
        modalRef.current?.hide();
      });
    }
  }

  return {onRemove, handleChange, selectedPlaylist};
};
