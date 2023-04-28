import {PlaylistDTO} from '../../../../models/Playlist';

export type PlaylistImpl = () => {
  get(): Promise<any>;
  create(data: PlaylistDTO): Promise<void>;
  deleteItem(id: string | number): Promise<void>;
};
