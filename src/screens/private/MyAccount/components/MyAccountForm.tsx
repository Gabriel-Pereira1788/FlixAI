import React from 'react';

import {AuthDTO} from '@models';

import {Button, InputAuth} from '@components';
import {Errors} from '@hooks';

type Props = {
  formData: AuthDTO;
  errors: Errors | null;
  loading: boolean;
  handleFormData: (key: keyof AuthDTO, value: string) => void;
  submit: () => void;
};

export function MyAccountForm({
  formData,
  loading,
  errors,
  handleFormData,
  submit,
}: Props) {
  return (
    <>
      <InputAuth
        placeholder="Email"
        value={formData.email}
        error={errors?.email}
        onChangeText={value => handleFormData('email', value)}
      />
      <InputAuth
        placeholder="Nome"
        value={formData.name}
        error={errors?.name}
        onChangeText={value => handleFormData('name', value)}
      />
      <Button isLoading={loading} onPress={submit}>
        Editar
      </Button>
    </>
  );
}
