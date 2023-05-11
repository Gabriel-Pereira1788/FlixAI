import React from 'react';
import {AuthDTO} from '../../models/User';

import {ERRORS_FIREBASE_MESSAGE} from '../constants/errorsMessage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamListI} from '../../router/navigation';
import {AuthImpl, useAuth as _useAuth} from './useAuth';
import {AlertRef} from '../../components/Alert/model';

export type Errors = {
  [name in keyof AuthDTO]: string;
};

type Props<T extends keyof RootParamListI> = {
  alertRef: React.RefObject<AlertRef>;
  fields: AuthDTO;
  typeSubmit: 'signIn' | 'signUp' | 'edit';
  successMessage?: string;
  navigation?: NativeStackNavigationProp<RootParamListI, T, undefined>;
  useAuth?: AuthImpl;
};
export function useFormAuth<T extends keyof RootParamListI>({
  fields,
  alertRef,
  navigation,
  successMessage,
  typeSubmit,
  useAuth = _useAuth,
}: Props<T>) {
  const {signIn, signUp, edit} = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [formData, setformData] = React.useState<AuthDTO>(fields);
  const [errors, setErrors] = React.useState<Errors | null>(null);

  function handleFormData(key: keyof AuthDTO, value: string) {
    setformData(prev => ({...prev, [key]: value}));
    if (errors) {
      setErrors(null);
    }
  }

  async function submit() {
    if (typeSubmit === 'edit') {
      await edit(formData);
      return;
    }
    if (typeSubmit === 'signUp') {
      await signUp(formData);
      return;
    }
    return await signIn(formData);
  }

  async function onSubmit() {
    const haveErrors = validationFields(formData);
    setErrors(haveErrors);
    if (!!haveErrors === false) {
      setLoading(true);
      try {
        if (alertRef.current?.isOpen) {
          alertRef.current.hide();
        }
        await submit();
        navigation && navigation.replace('Home', {screen: 'sugestions'});

        alertRef.current?.open({
          isOpen: true,
          text: successMessage || 'Sucesso!',
          status: 'success',
        });
      } catch (error) {
        const Error = error as {message: string};
        console.log(Error);
        let messageError = '';
        Object.entries(ERRORS_FIREBASE_MESSAGE).forEach(([key, value]) => {
          if (Error.message.includes(key)) {
            messageError = value as string;
          }
        });

        alertRef.current?.open({
          isOpen: true,
          text: messageError,
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return {formData, loading, errors, handleFormData, onSubmit, setformData};
}

function validationFields(formData: AuthDTO) {
  let errors = {} as Errors;

  Object.entries(formData).forEach(([key, value]) => {
    if (String(value).trim() === '') {
      errors[key as keyof typeof errors] = 'Campo vazio';
    }
  });

  return Object.values(errors).length > 0 ? errors : null;
}

export type FormAuthImpl<T extends keyof RootParamListI> = (
  props: Props<T>,
) => ReturnType<typeof useFormAuth>;
