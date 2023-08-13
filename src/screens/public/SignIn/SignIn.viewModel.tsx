import {AuthDTO} from '@models';
import {useToastActions} from '@store';

import {useAuth, useForm} from '@hooks';

type HookProps = {
  redirectToHome: () => void;
};

export function useSignInViewModel({redirectToHome}: HookProps) {
  const {signIn} = useAuth();
  const toast = useToastActions();
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

    toast.success('Sucesso!');
  }

  function onError(message: string) {
    toast.error(message);
  }

  return {
    loading,
    errors,
    formData,
    handleFormData,
    submit,
  };
}
