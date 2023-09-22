import {AuthDTO} from '@models';
import {useToastActions} from '@store';

import {useAuth, useForm} from '@hooks';

type Props = {
  redirectToHome: () => void;
};

export function useSignUpViewModel({redirectToHome}: Props) {
  const {signUp} = useAuth();
  const toast = useToastActions();
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
    toast.success('Sucesso!');
  }

  function onError(message: string) {
    toast.error(message);
  }

  return {
    errors,
    formData,
    loading,
    handleFormData,
    submit,
  };
}
