import {PlaylistDTO} from '../../../../models/Playlist';
import {useQueryRealm, useRealm} from '../../db';
import {Playlist} from '../../schemas/PlaylistSchema';
import {PlaylistImpl} from './model';

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
        title: data.title,
        movies: data.movies,
      });
    });
  }

  async function deleteItem(id: string | number) {
    console.log(id);
  }

  return {
    create,
    get,
    playlists,
    deleteItem,
  };
};
