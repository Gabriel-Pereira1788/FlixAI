import React from 'react';

import Animated, {FadeInLeft} from 'react-native-reanimated';

import {Box, Text} from '@components';

type Props = {
  children: React.ReactNode;
  title: string;
};

export function WrapperAuthScreen({children, title}: Props) {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      alignItems="center"
      justifyContent="center"
      padding={'m'}>
      <Box
        flex={1}
        width="100%"
        alignItems="flex-start"
        justifyContent="center"
        gap={'m'}>
        <Animated.View entering={FadeInLeft.delay(200).duration(200)}>
          <Text paddingTop="l" color="white" fontWeight={'500'} fontSize={40}>
            {title}
          </Text>
        </Animated.View>
        {children}
      </Box>
    </Box>
  );
}
