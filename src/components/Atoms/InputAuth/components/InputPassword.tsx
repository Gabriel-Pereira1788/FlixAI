import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Eye, EyeSlash} from 'phosphor-react-native';

import {useVisible} from '@hooks';

import {RenderIF} from '../../RenderIF/View';
import {InputAuth, InputProps} from '../View';

export function InputPassword({...rest}: InputProps) {
  const {visible, toggleVisible} = useVisible();

  const EyeIcon = (
    <TouchableOpacity style={{marginEnd: 5}} onPress={toggleVisible}>
      <RenderIF
        condition={visible}
        AlternativeComponent={
          <EyeSlash size={22} color="#ddd" weight="bold" />
        }>
        <Eye size={22} color="#ddd" weight="bold" />
      </RenderIF>
    </TouchableOpacity>
  );

  return (
    <InputAuth
      {...rest}
      type={visible ? 'text' : 'password'}
      rightElement={EyeIcon}
    />
  );
}
