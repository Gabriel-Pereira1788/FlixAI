import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {Theme} from '@styles';

import {Box} from '../Box/View';
import {Text} from '../Text/View';
import {RenderIF} from '../RenderIF/View';

const WrapperButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'buttonVariants'})], Box);

type ButtonProps = React.ComponentProps<typeof WrapperButton> & {
  isLoading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
};

export function Button({
  isLoading,
  variant,
  onPress,
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      testID="button"
      disabled={isLoading}
      onPress={onPress}
      style={{width: '100%'}}>
      <WrapperButton variant={isLoading ? 'disabled' : variant} {...rest}>
        <RenderIF
          condition={!isLoading}
          AlternativeComponent={
            <ActivityIndicator size="small" color="#fff" />
          }>
          <Text variant="button" color="white">
            {children}
          </Text>
        </RenderIF>
      </WrapperButton>
    </TouchableOpacity>
  );
}
