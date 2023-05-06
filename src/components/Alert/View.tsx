import React from 'react';
import * as S from 'native-base';
import Animated, {FadeInUp} from 'react-native-reanimated';
import RenderIF from '../RenderIF/View';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {AlertRef, AlertViewModel} from './model';
import {useAlert as _useAlert} from './useAlert';
type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  useAlert?: AlertViewModel;
};

export const Alert = React.forwardRef<AlertRef, Props>(
  ({containerStyle, useAlert = _useAlert}, ref) => {
    const {alertConfig} = useAlert({ref});

    return (
      <RenderIF condition={alertConfig.isOpen}>
        <Animated.View
          testID="alert"
          entering={FadeInUp.delay(150).duration(200)}
          style={[styles.animatedStyle, containerStyle]}>
          <S.Alert testID="alertContainer" status={alertConfig.status}>
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
