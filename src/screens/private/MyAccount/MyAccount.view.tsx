import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import {Box} from '@components';

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
      <Box
        flex={1}
        backgroundColor="background"
        alignItems="center"
        justifyContent="center">
        <Box
          width="100%"
          p={'m'}
          flex={1}
          gap={'m'}
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
        </Box>
      </Box>
    </SafeAreaView>
  );
}
