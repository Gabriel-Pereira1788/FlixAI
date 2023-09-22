import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {SignUp} from '../SignUp.view';
import {SignUpViewModel} from '../types';

const handleFormData = jest.fn();
const onSubmit = jest.fn();

const viewModelMock: SignUpViewModel = {
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
    const {getByText, getByPlaceholderText} = render(
      <JestProviders>
        <SignUp viewModel={viewModelMock} />
      </JestProviders>,
    );
    const inputEmail = getByPlaceholderText('Email');
    const inputName = getByPlaceholderText('Nome');
    const inputPassword = getByPlaceholderText('Senha');
    const buttonSubmit = getByText('Confirmar');

    expect(getByText('Cadastrar-se')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
    expect(inputEmail).toBeTruthy();
    expect(inputName).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(buttonSubmit).toBeTruthy();
  });

  it('change values form', () => {
    const {getByPlaceholderText, getByText} = render(
      <JestProviders>
        <SignUp viewModel={viewModelMock} />
      </JestProviders>,
    );
    const inputEmail = getByPlaceholderText('Email');
    const inputName = getByPlaceholderText('Nome');
    const inputPassword = getByPlaceholderText('Senha');
    const buttonSubmit = getByText('Confirmar');

    fireEvent.changeText(inputEmail, 'johndoe@gmail.com');
    fireEvent.changeText(inputName, 'John doe');
    fireEvent.changeText(inputPassword, 'johndoe123');
    fireEvent.press(buttonSubmit);

    expect(handleFormData).toBeCalledWith('email', 'johndoe@gmail.com');
    expect(handleFormData).toBeCalledWith('name', 'John doe');
    expect(handleFormData).toBeCalledWith('password', 'johndoe123');
    expect(onSubmit).toBeCalled();
  });
});
