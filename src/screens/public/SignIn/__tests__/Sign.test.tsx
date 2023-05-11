import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../../providers/JestProviders';
import SignIn from '../View';
import {FormAuthImpl} from '../../../../helpers/hooks/useFormAuth';

const navigation = {
  navigate: jest.fn(),
} as any;
const route = {} as any;

const handleFormData = jest.fn();
const onSubmit = jest.fn();
const setformData = jest.fn();
const mockUseFormAuth: FormAuthImpl<'SignIn'> = () => ({
  errors: null,
  formData: {
    email: '',
    password: '',
  },
  loading: false,
  handleFormData,
  onSubmit,
  setformData,
});

describe('SignIn', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SignIn
          navigation={navigation}
          route={route}
          useFormAuth={mockUseFormAuth}
        />
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
        <SignIn
          navigation={navigation}
          route={route}
          useFormAuth={mockUseFormAuth}
        />
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
        <SignIn
          navigation={navigation}
          route={route}
          useFormAuth={mockUseFormAuth}
        />
      </JestProviders>,
    );

    const register = getByTestId('register');

    fireEvent.press(register);

    expect(navigation.navigate).toBeCalledWith('SignUp');
  });
});
