import {STORAGE_KEYS} from '@constants';
import {User} from '@models';

import queryClient from '../../api/config/queryClient';
import {Storage} from '../storage/Storage';

class Auth {
  constructor() {}

  async persistUser() {
    console.log('persist user');
    const data = await Storage.get<User>(STORAGE_KEYS.user);
    return data;
  }

  async startUserSession(dataUser: User) {
    await Storage.set(STORAGE_KEYS.user, dataUser);

    queryClient.invalidateQueries();
    queryClient.refetchQueries();
  }

  async signOut() {
    await Storage.remove(STORAGE_KEYS.user);
    queryClient.invalidateQueries();
    queryClient.refetchQueries();
  }
}

export const AuthService = new Auth();
