import React from 'react';

import {WrapperAuthScreen, InputAuth, InputPassword, Button} from '@components';

import {SignUpViewModel} from './types';

interface SignUpProps {
  viewModel: SignUpViewModel;
}

export function SignUp({viewModel}: SignUpProps) {
  const {formData, errors, loading, handleFormData, submit} = viewModel;

  return (
    <WrapperAuthScreen title="Cadastrar-se">
      <InputAuth
        placeholder="Nome"
        value={formData.name}
        error={errors?.name}
        onChangeText={value => handleFormData('name', value)}
      />
      <InputAuth
        placeholder="Email"
        value={formData.email}
        error={errors?.email}
        onChangeText={value => handleFormData('email', value)}
      />
      <InputPassword
        placeholder="Senha"
        value={formData.password}
        error={errors?.password}
        onChangeText={value => handleFormData('password', value)}
      />
      <Button isLoading={loading} onPress={submit}>
        Confirmar
      </Button>
    </WrapperAuthScreen>
  );
}
