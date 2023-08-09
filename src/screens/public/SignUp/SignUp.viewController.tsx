import React from 'react';

import {NavigationProps} from '../../../router/navigation';

import {SignUp} from './SignUp.view';
import {useSignUpViewModel} from './SignUp.viewModel';

interface Props extends NavigationProps<'SignUp'> {}

export function SignUpViewController({navigation}: Props) {
  const viewModel = useSignUpViewModel({
    redirectToHome,
  });

  function redirectToHome() {
    navigation.navigate('Home', {screen: 'sugestions'});
  }
  return <SignUp viewModel={viewModel} />;
}
