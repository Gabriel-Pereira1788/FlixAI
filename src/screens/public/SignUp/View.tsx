import React from 'react';

import {
  WrapperAuthScreen,
  InputAuth,
  InputPassword,
  AlertRef,
  Button,
} from '@components';

import {NavigationProps} from '../../../router/navigation';
import {
  FormAuthImpl,
  useFormAuth as _useFormAuth,
} from '../../../helpers/hooks/useFormAuth';

interface SignUpProps extends NavigationProps<'SignUp'> {
  useFormAuth?: FormAuthImpl<'SignUp'>;
}

export default function SignUp({
  navigation,
  useFormAuth = _useFormAuth,
}: SignUpProps) {
  const alertRef = React.useRef<AlertRef>(null);
  const {formData, loading, errors, onSubmit, handleFormData} = useFormAuth({
    fields: {
      email: '',
      password: '',
    },
    navigation,
    typeSubmit: 'signUp',
    alertRef,
  });

  return (
    <WrapperAuthScreen title="Cadastrar-se" alertRef={alertRef}>
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
      <Button isLoading={loading} onPress={onSubmit}>
        Confirmar
      </Button>
    </WrapperAuthScreen>
  );
}
