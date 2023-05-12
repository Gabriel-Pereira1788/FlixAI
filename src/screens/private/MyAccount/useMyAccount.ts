import {useFormAuth} from '../../../helpers/hooks/useFormAuth';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAuth} from '../../../helpers/hooks/useAuth';

import {useUser} from '../../../store/server/useUser';

import {HookProps} from './models';

export function useMyAccount({alertRef}: HookProps) {
  const {user} = useUser();
  const {signOut} = useAuth();

  const dataForm = useFormAuth({
    fields: {
      email: user?.email || '',
      name: user?.name || '',
      photoURL: user?.photoURL || '',
    },
    typeSubmit: 'edit',
    successMessage: 'Usuário editado com sucesso!',
    alertRef,
  });

  async function handleSignOut() {
    await signOut();
  }

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 0.9,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const assets = result.assets;
      dataForm.setformData(prev => ({...prev, photoURL: assets[0].uri}));
    }
  };

  return {
    ...dataForm,
    handleSignOut,
    pickImage,
  };
}
