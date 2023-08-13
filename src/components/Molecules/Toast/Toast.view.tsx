import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {useToastActions, useToastStore} from '@store';
import {Theme} from '@styles';
import Animated, {FadeInUp} from 'react-native-reanimated';

import {RenderIF, Box, Text} from '@components';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

const AlertWrapper = createRestyleComponent<
  VariantProps<Theme, 'alertVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'alertVariants'})], Box);

export function Toast({containerStyle}: Props) {
  const toast = useToastStore();
  const {hide} = useToastActions();

  React.useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        hide();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);
  return (
    <RenderIF condition={toast.isOpen}>
      <Animated.View
        testID="alert"
        entering={FadeInUp.delay(150).duration(200)}
        style={[styles.animatedStyle, containerStyle]}>
        <AlertWrapper testID="alertContainer" variant={toast.status}>
          <Box
            flexDirection="row"
            flexShrink={1}
            gap={'xs'}
            alignItems="center"
            justifyContent="space-between">
            <Box
              flexDirection="row"
              flexShrink={1}
              gap={'xs'}
              alignItems="center"
              paddingHorizontal={'xs'}>
              <Text fontWeight="600" color="black">
                {toast.text}
              </Text>
            </Box>
          </Box>
        </AlertWrapper>
      </Animated.View>
    </RenderIF>
  );
}

const styles = StyleSheet.create({
  animatedStyle: {
    zIndex: 10,
    margin: 50,
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
