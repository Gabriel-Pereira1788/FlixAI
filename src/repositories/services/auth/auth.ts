import {STORAGE_KEYS} from '../../../helpers/constants/queryKeys';
import {User} from '../../../models/User';
import queryClient from '../config/queryClient';
import {Storage} from '../storage/Storage';

export class Auth {
  constructor() {}

  async persistUser() {
    console.log('persist user');
    const data = await Storage.get<User>(STORAGE_KEYS.user);
    return data;
  }

  async setUser(dataUser: User) {
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

export default new Auth();
