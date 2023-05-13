import {AuthDTO} from '../../models/User';
import authFB from '@react-native-firebase/auth';
import {formatUser} from '../utils/formatUser';
import auth from '../../repositories/services/auth/auth';
import {saveImage} from '../utils/saveImage';

export function useAuth() {
  async function signUp(data: AuthDTO) {
    const result = await authFB().createUserWithEmailAndPassword(
      data.email,
      data.password!,
    );

    if (result.user) {
      result.user.updateProfile({
        displayName: data.name!,
      });
      const dataUser = formatUser(result.user, data.name!);
      await auth.setUser(dataUser);
    }
  }

  async function signIn(data: AuthDTO) {
    const result = await authFB().signInWithEmailAndPassword(
      data.email,
      data.password!,
    );
    if (result.user) {
      const dataUser = formatUser(result.user, result.user.displayName!);

      await auth.setUser(dataUser);
    }
  }

  async function edit(data: AuthDTO) {
    await authFB().currentUser?.updateEmail(data.email);
    await saveImage(data.photoURL, url => {
      authFB()
        .currentUser?.updateProfile({
          displayName: data.name,
          photoURL: url,
        })
        .then(async () => {
          const user = authFB().currentUser;
          if (user) {
            const dataUser = formatUser(user, data.name!);
            await auth.setUser(dataUser);
          }
        });
    });
  }

  async function signOut() {
    await authFB().signOut();
    await auth.signOut();
  }

  return {signIn, signUp, edit, signOut};
}

export type AuthImpl = () => ReturnType<typeof useAuth>;
