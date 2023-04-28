import React from 'react';
import * as S from 'native-base';
import WrapperAuthScreen from '../../../components/WrapperAuthScreen/View';
import Input from '../../../components/Input/View';
import Button from '../../../components/Button/View';

import {TouchableOpacity} from 'react-native-gesture-handler';

import InputPassword from '../../../components/Input/components/InputPassword';

export default function SignIn() {
  function redirect() {
    //navigation.navigate("SignUp");
  }
  return (
    <WrapperAuthScreen title="Entrar">
      <Input
        placeholder="Email"
        backgroundColor="#131212"
        /*  value={formData.email}
        error={errors?.email}
        onChangeText={value => handleFormData('email', value)} */
      />
      <InputPassword
        placeholder="Senha"
        backgroundColor="#131212"
        /*  value={formData.password}
        error={errors?.password}
        onChangeText={value => handleFormData('password', value)} */
      />
      <Button>Confirmar</Button>
      <S.HStack
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        space={3}
        px={2}>
        <S.Text color="#636262" fontSize="md" fontWeight={500}>
          Não possui conta ?
        </S.Text>
        <TouchableOpacity onPress={redirect}>
          <S.Text color="orange.500" fontSize="lg" fontWeight={500}>
            Cadastar-se
          </S.Text>
        </TouchableOpacity>
      </S.HStack>
    </WrapperAuthScreen>
  );
}
