import React from 'react';
import {AddModalViewModel} from './models';
import {modalRef} from '../../../../../components/Modal/View';
import {usePlaylist} from '../../../../../repositories/database/useCases/Playlist/usePlaylist';
import {useRealm} from '../../../../../repositories/database/db';

export const useAddModal: AddModalViewModel = ({
  movie,
  useRealmImpl = useRealm,
  usePlaylistImpl = usePlaylist,
}) => {
  const playlistImpl = usePlaylistImpl();
  const realm = useRealmImpl();

  const [idPlaylist, setIdPlaylist] = React.useState<string>('');

  const dataPlaylist = React.useMemo(() => {
    return playlistImpl.get();
  }, [playlistImpl]);

  function handleChange(value: string) {
    setIdPlaylist(value);
  }

  function onAdd() {
    const playlist = dataPlaylist.filtered(`title = "${idPlaylist}"`);

    const haveInPlaylist =
      playlist.length > 0
        ? playlist[0]?.movies.find(dataMovie => dataMovie.id === movie.id)
        : null;
    if (!!haveInPlaylist === false) {
      realm.write(() => {
        if (playlist.length > 0 && playlist[0].movies) {
          const newMovies = [...playlist[0].movies, movie];
          console.log('new movies', newMovies);

          playlist[0].movies = newMovies;
        }
      });

      modalRef.current?.hide();
    } else {
      console.log('have in playlist');
    }
  }

  console.log('dataPlaylist', dataPlaylist);

  return {dataPlaylist, idPlaylist, handleChange, onAdd};
};
