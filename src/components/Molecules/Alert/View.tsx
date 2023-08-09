import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {useAlertStore} from '@store';
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

export function Alert({containerStyle}: Props) {
  const {state, hide} = useAlertStore();

  React.useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => {
        hide();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <RenderIF condition={state.isOpen}>
      <Animated.View
        testID="alert"
        entering={FadeInUp.delay(150).duration(200)}
        style={[styles.animatedStyle, containerStyle]}>
        <AlertWrapper testID="alertContainer" variant={state.status}>
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
                {state.text}
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
