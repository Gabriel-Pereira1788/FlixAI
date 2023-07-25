import React from 'react';
import {InputAuth, InputProps} from '../View';
import {useVisible} from '@hooks';

import {TouchableOpacity} from 'react-native';
import {RenderIF} from '../../RenderIF/View';
import {Eye, EyeSlash} from 'phosphor-react-native';

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
