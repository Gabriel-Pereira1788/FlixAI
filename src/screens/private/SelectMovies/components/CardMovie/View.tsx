import React from 'react';
import * as S from 'native-base';

import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Movie} from '../../../../../models/Movie';
import ProgressiveImage from '../../../../../components/ProgressiveImage/View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../../../helpers/constants/tmdb';

type Props = Pick<Movie, 'backdrop_path' | 'title' | 'id'> & {
  w?: number;
  h?: number;
};

export default function CardMovie({backdrop_path, title, id, w, h}: Props) {
  const navigation = useNavigation();
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(200)}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SingleMovie', {idMovie: id})}>
        <S.VStack m={5} space={2} alignItems="center" justifyContent="center">
          <ProgressiveImage
            source={{
              uri: `${TMBD_BACKDROP_URL}${backdrop_path}`,
            }}
            thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${backdrop_path}`}
            progressiveRenderingEnabled={true}
            containerProps={{
              style: {
                borderRadius: 20,
                borderColor: '#dddddd35',
                borderWidth: 1,
              },
            }}
            style={{
              width: w || 200,
              height: h || 250,
            }}
          />

          <S.Text fontWeight={500} color="#ddd" fontSize="md">
            {title}
          </S.Text>
        </S.VStack>
      </TouchableOpacity>
    </Animated.View>
  );
}
