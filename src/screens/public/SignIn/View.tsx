import React from 'react';
import * as S from 'native-base';
import WrapperAuthScreen from '../../../components/WrapperAuthScreen/View';
import Input from '../../../components/Input/View';
import Button from '../../../components/Button/View';

import {TouchableOpacity} from 'react-native-gesture-handler';

import InputPassword from '../../../components/Input/components/InputPassword';
import {NavigationProps} from '../../../router/navigation';
import {
  FormAuthImpl,
  useFormAuth as _useFormAuth,
} from '../../../helpers/hooks/useFormAuth';
import {AlertRef} from '../../../components/Alert/model';

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
      <Input
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
      <S.HStack
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        space={3}
        px={2}>
        <S.Text color="#636262" fontSize="md" fontWeight={500}>
          Não possui conta ?
        </S.Text>
        <TouchableOpacity testID="register" onPress={redirect}>
          <S.Text color="orange.500" fontSize="lg" fontWeight={500}>
            Cadastar-se
          </S.Text>
        </TouchableOpacity>
      </S.HStack>
    </WrapperAuthScreen>
  );
}
