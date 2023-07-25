import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {RenderIF, Box, Text} from '@components/atoms';
import {Theme} from '@styles';
import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

import {AlertRef, AlertViewModel} from './model';
import {useAlert as _useAlert} from './useAlert';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  useAlert?: AlertViewModel;
};

const AlertWrapper = createRestyleComponent<
  VariantProps<Theme, 'alertVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'alertVariants'})], Box);

export const Alert = React.forwardRef<AlertRef, Props>(
  ({containerStyle, useAlert = _useAlert}, ref) => {
    const {alertConfig} = useAlert({ref});

    return (
      <RenderIF condition={alertConfig.isOpen}>
        <Animated.View
          testID="alert"
          entering={FadeInUp.delay(150).duration(200)}
          style={[styles.animatedStyle, containerStyle]}>
          <AlertWrapper testID="alertContainer" variant={alertConfig.status}>
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
                  {alertConfig.text}
                </Text>
              </Box>
            </Box>
          </AlertWrapper>
        </Animated.View>
      </RenderIF>
    );
  },
);

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
