import React from 'react';

import {NavigationProps} from '../../../router/navigation';

import {SignIn} from './SignIn.view';
import {useSignInViewModel} from './SignIn.viewModel';

interface Props extends NavigationProps<'SignIn'> {}

export function SignInViewController({navigation}: Props) {
  function redirectToHome() {
    navigation.navigate('Home', {screen: 'sugestions'});
  }

  function redirectToSignUp() {
    navigation.navigate('SignUp');
  }
  const viewModel = useSignInViewModel({redirectToHome});
  return <SignIn redirectToSignUp={redirectToSignUp} viewModel={viewModel} />;
}
