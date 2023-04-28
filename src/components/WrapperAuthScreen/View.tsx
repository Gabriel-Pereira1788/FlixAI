import React from 'react';
import * as S from 'native-base';
import {ImageBackground} from 'react-native';

import ImgBack from '../../assets/images/bg.jpg';
import Animated, {FadeInLeft} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function WrapperAuthScreen({children, title}: Props) {
  return (
    <ImageBackground source={ImgBack} style={{flex: 1}}>
      <S.VStack
        flex={1}
        backgroundColor="rgba(0,0,0,0.9)"
        alignItems="center"
        justifyContent="center"
        p={3}>
        {/*  <Alert /> */}
        <S.VStack
          flex={1}
          w="100%"
          alignItems="flex-start"
          justifyContent="center"
          space={3}>
          <Animated.View entering={FadeInLeft.delay(200).duration(200)}>
            <S.Text color="#fff" fontWeight={500} fontSize="3xl">
              {title}
            </S.Text>
          </Animated.View>
          {children}
        </S.VStack>
      </S.VStack>
    </ImageBackground>
  );
}
