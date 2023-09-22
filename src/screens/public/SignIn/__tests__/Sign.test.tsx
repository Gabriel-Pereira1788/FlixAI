import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {SignIn} from '../SignIn.view';
import {SignInViewModel} from '../types';

const handleFormData = jest.fn();
const onSubmit = jest.fn();
const redirectToSignUp = jest.fn();
const viewModelMock: SignInViewModel = {
  errors: null,
  formData: {
    email: '',
    password: '',
  },
  loading: false,
  handleFormData,
  submit: onSubmit,
};

describe('SignIn', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SignIn redirectToSignUp={redirectToSignUp} viewModel={viewModelMock} />
      </JestProviders>,
    );

    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText('Não possui conta ?')).toBeTruthy();
    expect(getByText('Cadastar-se')).toBeTruthy();
  });

  it('change values form', () => {
    const {getByPlaceholderText, getByText} = render(
      <JestProviders>
        <SignIn redirectToSignUp={redirectToSignUp} viewModel={viewModelMock} />
      </JestProviders>,
    );
    const inputEmail = getByPlaceholderText('Email');
    const inputPassword = getByPlaceholderText('Senha');
    const buttonSubmit = getByText('Confirmar');

    fireEvent.changeText(inputEmail, 'johndoe@gmail.com');
    fireEvent.changeText(inputPassword, 'johndoe123');
    fireEvent.press(buttonSubmit);

    expect(handleFormData).toBeCalledWith('email', 'johndoe@gmail.com');
    expect(handleFormData).toBeCalledWith('password', 'johndoe123');
    expect(onSubmit).toBeCalled();
  });

  it('redirect to signUp screen', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SignIn redirectToSignUp={redirectToSignUp} viewModel={viewModelMock} />
      </JestProviders>,
    );

    const register = getByTestId('register');

    fireEvent.press(register);

    expect(redirectToSignUp).toBeCalled();
  });
});
