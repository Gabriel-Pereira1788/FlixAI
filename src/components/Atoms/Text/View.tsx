import React from 'react';

import {createText} from '@shopify/restyle';
import {Theme} from '@styles';

export const TextRE = createText<Theme>();

export interface TextProps extends React.ComponentProps<typeof TextRE> {}
export function Text({children, ...rest}: TextProps) {
  return <TextRE {...rest}>{children}</TextRE>;
}
