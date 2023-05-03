import React from 'react';
import * as S from 'native-base';
import Animated, {FadeInUp} from 'react-native-reanimated';
import RenderIF from '../RenderIF/View';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {AlertRef} from './model';
import {useAlert} from './useAlert';
type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export const Alert = React.forwardRef<AlertRef, Props>(
  ({containerStyle}, ref) => {
    const {alertConfig} = useAlert({ref});

    return (
      <RenderIF condition={alertConfig.isOpen}>
        <Animated.View
          testID="alert"
          entering={FadeInUp.delay(150).duration(200)}
          style={[styles.animatedStyle, containerStyle]}>
          <S.Alert status={alertConfig.status}>
            <S.HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between">
              <S.HStack flexShrink={1} space={2} alignItems="center" px={3}>
                <S.Alert.Icon testID="icon-status" />
                <S.Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {alertConfig.text}
                </S.Text>
              </S.HStack>
            </S.HStack>
          </S.Alert>
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
