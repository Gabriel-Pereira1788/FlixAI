import React from 'react';

import {ERRORS_FIREBASE_MESSAGE} from '@constants';
import {AuthDTO} from '@models';

type Props = {
  defaultData?: AuthDTO;
  onSubmit: (formData: AuthDTO) => Promise<void>;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};
export type Errors = {
  [name in keyof AuthDTO]: string;
};

export function useForm({defaultData, onSubmit, onSuccess, onError}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setformData] = React.useState(
    defaultData ?? ({} as AuthDTO),
  );
  const [errors, setErrors] = React.useState<Errors | null>(null);

  function handleFormData(key: keyof AuthDTO, value: string) {
    setformData(prev => ({...prev, [key]: value}));
    if (errors) {
      setErrors(null);
    }
  }

  async function submit() {
    const haveErrors = validationFields(formData);
    setErrors(haveErrors);
    try {
      if (!!haveErrors === false) {
        setLoading(true);
        await onSubmit(formData);

        onSuccess && onSuccess();
      }
    } catch (error) {
      const Error = error as {message: string};
      console.log(Error);
      let messageError = '';
      Object.entries(ERRORS_FIREBASE_MESSAGE).forEach(([key, value]) => {
        if (Error.message.includes(key)) {
          messageError = value as string;
        }
      });
      onError && onError(messageError);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    formData,
    errors,
    handleFormData,
    submit,
  };
}

function validationFields(formData: AuthDTO) {
  let errors = {} as Errors;

  Object.entries(formData).forEach(([key, value]) => {
    if (String(value).trim() === '') {
      errors[key as keyof typeof errors] = 'Campo vazio';
    }
  });

  return Object.values(errors).length > 0 ? errors : null;
}
