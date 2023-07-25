import React from 'react';
import {HookProps} from './models';
import {modalRef} from '../../../../../components/Organisms/Modal/View';
import {usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';
import {useRealm} from '../../../../../repositories/database/db';

export const useAddModal = ({
  movie,
  useRealmImpl = useRealm,
  usePlaylistImpl = usePlaylist,
}: HookProps) => {
  const playlistImpl = usePlaylistImpl();
  const realm = useRealmImpl();

  const [idPlaylist, setIdPlaylist] = React.useState('');

  const dataPlaylist = React.useMemo(() => {
    return playlistImpl.get();
  }, [playlistImpl]);

  function handleChange(value: string) {
    setIdPlaylist(value);
  }

  function onAdd() {
    const playlist = playlistImpl.filtered(`title = "${idPlaylist}"`);

    const haveInPlaylist =
      playlist.length > 0
        ? playlist[0]?.movies.find(dataMovie => dataMovie.id === movie.id)
        : null;

    if (!!haveInPlaylist === false) {
      realm.write(() => {
        if (playlist.length > 0 && playlist[0].movies) {
          const newMovies = [...playlist[0].movies, movie];
          realm.create(
            'Playlist',
            {_id: playlist[0]._id, title: playlist[0].title, movies: newMovies},
            Realm.UpdateMode.Modified,
          );
        }
      });

      modalRef.current?.hide();
    } else {
      console.log('have in playlist');
    }
  }

  return {dataPlaylist, idPlaylist, handleChange, onAdd};
};
