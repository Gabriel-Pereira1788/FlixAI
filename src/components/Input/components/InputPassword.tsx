import React from 'react';
import Input, {InputProps} from '../View';

import {TouchableOpacity} from 'react-native';
import RenderIF from '../../RenderIF/View';
import {Eye, EyeSlash} from 'phosphor-react-native';
import {useVisible} from '../../../helpers/hooks/useVisible';

export default function InputPassword({...rest}: InputProps) {
  const {visible, toggleVisible} = useVisible();

  const EyeIcon = (
    <TouchableOpacity style={{marginEnd: 10}} onPress={toggleVisible}>
      <RenderIF
        condition={visible}
        AlternativeComponent={
          <EyeSlash size={20} color="#ddd" weight="bold" />
        }>
        <Eye size={20} color="#ddd" weight="bold" />
      </RenderIF>
    </TouchableOpacity>
  );

  return (
    <Input
      {...rest}
      type={visible ? 'text' : 'password'}
      rightElement={EyeIcon}
    />
  );
}
