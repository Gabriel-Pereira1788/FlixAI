import React from 'react';
import {TouchableOpacity} from 'react-native';

import * as S from 'native-base';
import {SignOut, UserCircle} from 'phosphor-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RenderIF, Alert, InputAuth, Button} from '@components';

import {MyAccountViewModel} from './types';
interface MyAccountProps {
  viewModel: MyAccountViewModel;
}

export default function MyAccount({viewModel}: MyAccountProps) {
  const {
    formData,
    errors,
    loading,
    handleFormData,
    submit,
    handleSignOut,
    pickImage,
  } = viewModel;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0f0f16'}}>
      <Alert />
      <S.VStack
        flex={1}
        backgroundColor="background.main"
        alignItems="center"
        justifyContent="center">
        <S.VStack
          w="100%"
          p={3}
          flex={1}
          space={3}
          alignItems="center"
          justifyContent="center">
          <TouchableOpacity onPress={pickImage}>
            <RenderIF
              condition={!!formData.photoURL}
              AlternativeComponent={<UserCircle size={100} color="#ddd" />}>
              <S.Image
                source={{uri: formData.photoURL}}
                width={100}
                height={100}
                rounded="full"
                alt="image-user"
              />
            </RenderIF>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <S.Text mr={2} color="#fff" fontWeight={500} fontSize="xl">
              Sair
            </S.Text>
            <SignOut size={30} color="#fff" />
          </TouchableOpacity>
        </S.VStack>
      </S.VStack>
    </SafeAreaView>
  );
}
