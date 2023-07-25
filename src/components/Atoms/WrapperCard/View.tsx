import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {Theme} from '@styles';

import {Box} from '../Box/View';
import React from 'react';

const Wrapper = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

export type WrapperProps = React.ComponentProps<typeof Wrapper>;

interface WrapperCardProps extends Omit<WrapperProps, 'children'> {
  children: React.ReactNode;
}

export function WrapperCard({variant, ...rest}: WrapperCardProps) {
  return (
    <Wrapper variant={variant} {...rest}>
      {rest.children && rest.children}
    </Wrapper>
  );
}
