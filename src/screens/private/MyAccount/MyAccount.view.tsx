import React from 'react';

import * as S from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MyAccountForm} from './components/MyAccountForm';
import {MyAccountImageProfile} from './components/MyAccountImageProfile';
import {MyAccountSignOut} from './components/MyAccountSignOut';
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
          <MyAccountImageProfile
            photoURL={formData.photoURL}
            pickImage={pickImage}
          />
          <MyAccountForm
            formData={formData}
            errors={errors}
            handleFormData={handleFormData}
            loading={loading}
            submit={submit}
          />
          <MyAccountSignOut handleSignOut={handleSignOut} />
        </S.VStack>
      </S.VStack>
    </SafeAreaView>
  );
}
