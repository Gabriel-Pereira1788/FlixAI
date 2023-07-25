import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

import React from 'react';
import {Image as ImageNative, ImageProps} from 'react-native';
import {Theme} from '@styles';
import {Box} from '../Box/View';

const ImageWrapper = createRestyleComponent<
  VariantProps<Theme, 'imageVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'imageVariants'})], Box);

export type IImageProps = React.ComponentProps<typeof ImageWrapper> &
  ImageProps & {
    testID?: string;
  };
export function Image({source, variant, testID, ...rest}: IImageProps) {
  return (
    <ImageWrapper variant={variant} {...rest} overflow="hidden">
      <ImageNative
        source={source}
        testID={testID}
        style={{width: '100%', height: '100%'}}
      />
    </ImageWrapper>
  );
}
