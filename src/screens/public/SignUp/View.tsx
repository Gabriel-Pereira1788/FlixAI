import React from 'react';

import WrapperAuthScreen from '../../../components/WrapperAuthScreen/View';
import Input from '../../../components/Input/View';
import Button from '../../../components/Button/View';

import InputPassword from '../../../components/Input/components/InputPassword';

export default function SignUp() {
  return (
    <WrapperAuthScreen title="Cadastar-se">
      <Input
        placeholder="Nome"
        backgroundColor="#131212"
        /*     value={formData.name}
        error={errors?.name}
        onChangeText={value => handleFormData('name', value)} */
      />
      <Input
        placeholder="Email"
        backgroundColor="#131212"
        /*     value={formData.email}
        error={errors?.email}
        onChangeText={value => handleFormData('email', value)} */
      />
      <InputPassword
        placeholder="Senha"
        backgroundColor="#131212"
        /*         value={formData.password}
        error={errors?.password}
        onChangeText={value => handleFormData('password', value)} */
      />
      <Button>Confirmar</Button>
    </WrapperAuthScreen>
  );
}
