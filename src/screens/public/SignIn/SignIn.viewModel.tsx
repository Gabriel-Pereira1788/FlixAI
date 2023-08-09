import {AuthDTO} from '@models';
import {useAlertStore} from '@store';

import {useAuth, useForm} from '@hooks';

type HookProps = {
  redirectToHome: () => void;
};

export function useSignInViewModel({redirectToHome}: HookProps) {
  const {signIn} = useAuth();
  const {success, error} = useAlertStore();
  const {loading, errors, formData, handleFormData, submit} = useForm({
    onSubmit,
    onSuccess,
    onError,
  });

  async function onSubmit(formData: AuthDTO) {
    await signIn(formData);
  }

  function onSuccess() {
    redirectToHome();

    success('Sucesso!');
  }

  function onError(message: string) {
    error(message);
  }

  return {
    loading,
    errors,
    formData,
    handleFormData,
    submit,
  };
}
