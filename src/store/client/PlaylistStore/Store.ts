import {Realm} from '@realm/react';
import {create} from 'zustand';

interface Actions {
  selectPlaylist(id: Realm.BSON.ObjectId): void;
  cleanUp(): void;
}

interface State {
  idPlaylist: Realm.BSON.ObjectId | null;
}

interface StoreProps {
  state: State;
  actions: Actions;
}

export const useStore = create<StoreProps>(set => ({
  state: {
    idPlaylist: null,
  },
  actions: {
    selectPlaylist(id) {
      set(() => ({
        state: {idPlaylist: id},
      }));
    },
    cleanUp() {
      set(() => ({
        state: {idPlaylist: null},
      }));
    },
  },
}));
