import React from 'react';
import * as S from 'native-base';
import {TouchableOpacity} from 'react-native';
import {RenderIF, Alert, AlertRef, InputAuth, Button} from '@components';

import {useMyAccount as _useMyAccount} from './useMyAccount';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MyAccountViewModel} from './models';
import {SignOut, UserCircle} from 'phosphor-react-native';

interface MyAccountProps {
  useMyAccount?: MyAccountViewModel;
}

export default function MyAccount({
  useMyAccount = _useMyAccount,
}: MyAccountProps) {
  const alertRef = React.useRef<AlertRef>(null);
  const {
    formData,
    errors,
    loading,
    handleFormData,
    onSubmit,
    handleSignOut,
    pickImage,
  } = useMyAccount({alertRef});
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0f0f16'}}>
      <Alert ref={alertRef} />
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
          <Button isLoading={loading} onPress={onSubmit}>
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
