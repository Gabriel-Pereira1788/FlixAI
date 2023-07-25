import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import React from 'react';
import {Theme} from '@styles';

import {TextInput, TextInputProps} from 'react-native';
import {Box} from '../Box/View';
import {RenderIF} from '../RenderIF/View';

const WrapperInput = createRestyleComponent<
  VariantProps<Theme, 'inputVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'inputVariants'})], Box);

export type DSInputProps = React.ComponentProps<typeof WrapperInput> &
  TextInputProps & {
    rightElement?: JSX.Element;

    textColor?: string;
    type?: 'text' | 'password';
  };

export function Input({
  variant,
  rightElement,
  textColor,
  type,
  ...rest
}: DSInputProps) {
  return (
    <WrapperInput
      variant={variant}
      {...rest}
      flexDirection="row"
      justifyContent="space-between"
      testID="wrapperInput">
      <TextInput
        {...(rest as TextInputProps)}
        secureTextEntry={type === 'password'}
        placeholderTextColor="#ddd"
        style={{
          width: '90%',
          color: textColor || '#fff',
        }}
      />
      <RenderIF condition={!!rightElement}>{rightElement}</RenderIF>
    </WrapperInput>
  );
}
