import {PlaylistDTO} from '../../../../models/Playlist';
import {useRealm} from '../../db';
import {PlaylistImpl} from './model';

export const usePlaylist: PlaylistImpl = () => {
  const realm = useRealm();

  async function get() {}
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
    deleteItem,
  };
};
