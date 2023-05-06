import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../models/Movie';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {TMBD_BACKDROP_URL} from '../../helpers/constants/tmdb';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Star} from 'phosphor-react-native';
import {BlurView} from '@react-native-community/blur';
import {makeVoteAverage} from '../../helpers/utils/makeVoteAverage';

export interface CardMoviesProps extends Movie {
  index?: number;
  containerStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  stackStyle?: S.IStackProps;
  onPress?: () => void;
  children?: React.ReactNode;
}
export default function CardMovie({
  backdrop_path,
  title,
  overview,
  containerStyle,
  stackStyle,
  index,
  vote_count,
  vote_average,
  onPress,
  children,
}: CardMoviesProps) {
  const style = typeof containerStyle === 'object' ? {...containerStyle} : {};

  const vote = makeVoteAverage(vote_count!, vote_average!);

  return (
    <Animated.View
      testID="container"
      style={{width: '97%', ...style}}
      entering={FadeInDown.delay(index || 1 + 1 * 100).duration(200)}>
      <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
        <S.HStack
          testID="container-stack"
          w="100%"
          shadow={2}
          my={2}
          p={2}
          backgroundColor="blueDark.primary"
          rounded="2xl"
          alignItems="center"
          justifyContent="space-between"
          space={3}
          {...stackStyle}>
          <S.Box position="relative">
            <S.Box position="absolute" top={1} left={0} zIndex={10}>
              <S.HStack
                position="relative"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                space={1}
                paddingY={1}
                borderTopRightRadius={15}
                borderBottomRightRadius={15}>
                <BlurView
                  style={styles.blurContainer}
                  blurType="dark"
                  blurAmount={20}
                />

                <Star size={15} color="#eea12f" weight="fill" />

                <S.Text color="#fff" fontWeight={500} marginRight={1}>
                  {vote.toFixed(1)}
                </S.Text>
              </S.HStack>
            </S.Box>

            <S.Image
              testID="image-card"
              source={{uri: `${TMBD_BACKDROP_URL}${backdrop_path}`}}
              alt="image-favorite"
              width={105}
              height={105}
              rounded="lg"
            />
          </S.Box>
          <S.VStack
            space={3}
            px={0}
            flex={2}
            alignItems="flex-start"
            justifyContent="center">
            <S.Text color="#ffffffc3" fontSize="md" fontWeight={500}>
              {title}
            </S.Text>
            <S.Text color="#cfcecec3" fontSize="sm" fontWeight={500}>
              {overview?.slice(0, 30)}...
            </S.Text>
          </S.VStack>
          {children && children}
        </S.HStack>
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
