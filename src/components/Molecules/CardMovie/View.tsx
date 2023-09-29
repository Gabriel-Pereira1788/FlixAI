import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {TMBD_BACKDROP_URL} from '@constants';
import {Movie} from '@models';
import {BlurView} from '@react-native-community/blur';
import {makeVoteAverage} from '@utils';
import {Star} from 'phosphor-react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Box, Image, Text, WrapperCard, WrapperProps} from '@components';

export interface CardMoviesProps extends Movie {
  index?: number;
  containerStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  stackStyle?: WrapperProps;
  onPress?: () => void;
  children?: React.ReactNode;
  testID?: string;
}
export function CardMovie({
  backdrop_path,
  title,
  overview,
  containerStyle,
  stackStyle,
  index,
  vote_count,
  vote_average,
  onPress,
  testID,
  children,
}: CardMoviesProps) {
  const style = typeof containerStyle === 'object' ? {...containerStyle} : {};

  const vote = makeVoteAverage(vote_count!, vote_average!);

  return (
    <Animated.View
      testID={testID ? testID : 'container'}
      style={{width: '97%', ...style}}
      entering={FadeInDown.delay(index || 1 + 1 * 100).duration(200)}>
      <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
        <WrapperCard
          variant="cardMovie"
          {...stackStyle}
          testID="container-stack">
          <Box position="relative" overflow="hidden" borderRadius="m">
            <Box position="absolute" top={3} left={0} zIndex={10}>
              <Box
                flexDirection="row"
                position="relative"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                gap={'s'}
                paddingVertical="one"
                paddingLeft="s"
                borderTopRightRadius={'m'}
                borderBottomRightRadius={'m'}>
                <BlurView
                  style={styles.blurContainer}
                  blurType="dark"
                  blurAmount={20}
                />

                <Star size={15} color="#eea12f" weight="fill" />

                <Text color="white" fontWeight={'500'} marginRight="s">
                  {vote.toFixed(1)}
                </Text>
              </Box>
            </Box>

            <Image
              testID="image-card"
              variant="cardImage"
              source={{uri: `${TMBD_BACKDROP_URL}${backdrop_path}`}}
              alt="image-favorite"
            />
          </Box>
          <Box gap="s" flex={2} alignItems="flex-start" justifyContent="center">
            <Text color="secondaryTextColor" fontSize={16.5} fontWeight={'500'}>
              {title}
            </Text>
            <Text color="thirdTextColor" fontSize={12} fontWeight={'500'}>
              {overview?.slice(0, 30)}...
            </Text>
          </Box>
          {children && children}
        </WrapperCard>
      </TouchableOpacity>
    </Animated.View>
  );
}
export const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
