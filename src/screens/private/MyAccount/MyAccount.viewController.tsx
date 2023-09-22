import React from 'react';

import MyAccount from './MyAccount.view';
import {useMyAccountViewModel} from './MyAccount.viewModel';

type Props = {};

export function MyAccountViewController({}: Props) {
  const viewModel = useMyAccountViewModel();
  return <MyAccount viewModel={viewModel} />;
}
