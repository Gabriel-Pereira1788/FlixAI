import {AuthDTO} from '@models';
import {useAlertStore} from '@store';

import {useAuth, useForm} from '@hooks';

type Props = {
  redirectToHome: () => void;
};

export function useSignUpViewModel({redirectToHome}: Props) {
  const {signUp} = useAuth();
  const {success, error} = useAlertStore();
  const {errors, formData, loading, handleFormData, submit} = useForm({
    onSubmit,
    onSuccess,
    onError,
  });

  async function onSubmit(formData: AuthDTO) {
    await signUp(formData);
  }

  function onSuccess() {
    redirectToHome();
    success('Sucesso!');
  }

  function onError(message: string) {
    error(message);
  }

  return {
    errors,
    formData,
    loading,
    handleFormData,
    submit,
  };
}
