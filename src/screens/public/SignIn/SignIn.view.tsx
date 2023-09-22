import React from 'react';
import {TouchableOpacity} from 'react-native';

import {
  InputPassword,
  InputAuth,
  WrapperAuthScreen,
  Box,
  Text,
  Button,
} from '@components';

import {SignInViewModel} from './types';

interface SignInProps {
  redirectToSignUp: () => void;
  viewModel: SignInViewModel;
}

export function SignIn({redirectToSignUp, viewModel}: SignInProps) {
  const {errors, formData, loading, handleFormData, submit} = viewModel;

  return (
    <WrapperAuthScreen title="Entrar">
      <InputAuth
        value={formData.email}
        error={errors?.email}
        placeholder="Email"
        onChangeText={value => handleFormData('email', value)}
      />
      <InputPassword
        placeholder="Senha"
        value={formData.password}
        error={errors?.password}
        onChangeText={value => handleFormData('password', value)}
      />
      <Button onPress={submit} isLoading={loading}>
        Confirmar
      </Button>
      <Box
        flexDirection="row"
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        gap="s"
        paddingHorizontal="s">
        <Text color="grayTextColor">Não possui conta ?</Text>

        <TouchableOpacity testID="register" onPress={redirectToSignUp}>
          <Text color="orange" fontWeight="600">
            Cadastar-se
          </Text>
        </TouchableOpacity>
      </Box>
    </WrapperAuthScreen>
  );
}
