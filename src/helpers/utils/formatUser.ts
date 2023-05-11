import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../../models/User';

export function formatUser(
  user: FirebaseAuthTypes.User,
  displayName: string,
): User {
  return {
    uid: user.uid,
    name: displayName,
    email: user.email!,
    photoURL: user.photoURL,
    createdAt:
      user.metadata && user.metadata.creationTime
        ? new Date(user.metadata.creationTime!).toISOString()
        : new Date().toISOString(),
  };
}
