import {AuthDTO} from '@models';
import {useToastActions, useUser} from '@store';
import {launchImageLibrary} from 'react-native-image-picker';

import {useAuth, useForm} from '@hooks';

export function useMyAccountViewModel() {
  const {user} = useUser();
  const {signOut, edit} = useAuth();
  const toast = useToastActions();

  const {errors, formData, handleFormData, loading, submit} = useForm({
    defaultData: {
      email: user?.email || '',
      name: user?.name || '',
      photoURL: user?.photoURL || '',
    },
    onSubmit,
    onSuccess,
    onError,
  });

  async function onSubmit(formData: AuthDTO) {
    await edit(formData);
  }

  function onSuccess() {
    toast.success('Usuário editado com sucesso!');
  }

  function onError(message: string) {
    toast.error(message);
  }

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
      handleFormData('photoURL', assets[0].uri ?? '');
    }
  };

  return {
    formData,
    errors,
    loading,
    submit,
    handleFormData,
    handleSignOut,
    pickImage,
  };
}
