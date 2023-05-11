import firebaseStorage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

export async function saveImage(
  file?: string | null,
  callbackFn?: (url: string) => Promise<void> | void,
) {
  let url: string = '';
  if (file) {
    const filename = file.substring(file.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? file.replace('file://', '') : file;

    const refStorage = firebaseStorage().ref('profileImages/');
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const uploadTask = refStorage.child(filename).put(blob);

    uploadTask.on(
      'state_changed',
      () => {},
      () => {},
      async () => {
        url = await uploadTask.snapshot!.ref.getDownloadURL();
        await callbackFn!(url);
      },
    );
  }

  return url;
}
