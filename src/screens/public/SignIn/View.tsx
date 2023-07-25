import React from 'react';
//*components
import {
  InputPassword,
  InputAuth,
  WrapperAuthScreen,
  AlertRef,
  Box,
  Text,
  Button,
} from '@components';

import {TouchableOpacity} from 'react-native';

import {NavigationProps} from '../../../router/navigation';
import {
  FormAuthImpl,
  useFormAuth as _useFormAuth,
} from '../../../helpers/hooks/useFormAuth';

interface SignInProps extends NavigationProps<'SignIn'> {
  useFormAuth?: FormAuthImpl<'SignIn'>;
}

export default function SignIn({
  navigation,
  useFormAuth = _useFormAuth,
}: SignInProps) {
  const alertRef = React.useRef<AlertRef>(null);
  const {formData, loading, errors, onSubmit, handleFormData} = useFormAuth({
    fields: {
      email: '',
      password: '',
    },
    navigation,
    typeSubmit: 'signIn',
    alertRef,
  });

  function redirect() {
    navigation.navigate('SignUp');
  }
  return (
    <WrapperAuthScreen title="Entrar" alertRef={alertRef}>
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
      <Button onPress={onSubmit} isLoading={loading}>
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

        <TouchableOpacity testID="register" onPress={redirect}>
          <Text color="orange" fontWeight="600">
            Cadastar-se
          </Text>
        </TouchableOpacity>
      </Box>
    </WrapperAuthScreen>
  );
}
