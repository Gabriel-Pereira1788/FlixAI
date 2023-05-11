import React from 'react';

import WrapperAuthScreen from '../../../components/WrapperAuthScreen/View';
import Input from '../../../components/Input/View';
import Button from '../../../components/Button/View';

import InputPassword from '../../../components/Input/components/InputPassword';
import {AlertRef} from '../../../components/Alert/model';
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
      <Input
        placeholder="Nome"
        value={formData.name}
        error={errors?.name}
        onChangeText={value => handleFormData('name', value)}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        error={errors?.email}
        onChangeText={value => handleFormData('email', value)}
      />
      <InputPassword
        placeholder="Senha"
        backgroundColor="#131212"
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
