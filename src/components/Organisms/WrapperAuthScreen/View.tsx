import React from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {AlertRef, Alert} from '@components/molecules';
import {Box, Text} from '@components/atoms';

type Props = {
  children: React.ReactNode;
  title: string;
  alertRef: React.RefObject<AlertRef>;
};

export function WrapperAuthScreen({children, title, alertRef}: Props) {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      alignItems="center"
      justifyContent="center"
      padding={'xs'}>
      <Alert ref={alertRef} />
      <Box
        flex={1}
        width="100%"
        alignItems="flex-start"
        justifyContent="center"
        gap={'m'}>
        <Animated.View entering={FadeInLeft.delay(200).duration(200)}>
          <Text color="white" fontWeight={'500'} fontSize={40}>
            {title}
          </Text>
        </Animated.View>
        {children}
      </Box>
    </Box>
  );
}
