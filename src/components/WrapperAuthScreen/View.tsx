import React from 'react';
import * as S from 'native-base';

import Animated, {FadeInLeft} from 'react-native-reanimated';
import {Alert} from '../Alert/View';
import {AlertRef} from '../Alert/model';

type Props = {
  children: React.ReactNode;
  title: string;
  alertRef: React.RefObject<AlertRef>;
};

export default function WrapperAuthScreen({children, title, alertRef}: Props) {
  return (
    <S.VStack
      flex={1}
      backgroundColor="background.main"
      alignItems="center"
      justifyContent="center"
      p={3}>
      <Alert ref={alertRef} />
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
  );
}
