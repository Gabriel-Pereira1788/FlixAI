import React from 'react';
import * as S from 'native-base';

import {TouchableOpacity} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Movie} from '../../../../../models/Movie';
import ProgressiveImage from '../../../../../components/ProgressiveImage/View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../../../helpers/constants/tmdb';
import {Check} from 'phosphor-react-native';
import {useSelectedMoviesContext} from '../../../../../providers/modules/SelectedMoviesProvider';
import RenderIF from '../../../../../components/RenderIF/View';

type Props = {
  dataMovie: Movie;
  w?: number;
  h?: number;
};

export default function CardMovie({dataMovie, w, h}: Props) {
  const {backdrop_path, title} = dataMovie;
  const {addToSelected, selectedMovies} = useSelectedMoviesContext();

  const isSelected = selectedMovies.find(movie => movie.id === dataMovie.id);
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(200)}>
      <TouchableOpacity onPress={() => addToSelected(dataMovie)}>
        <S.VStack m={5} space={2} alignItems="center" justifyContent="center">
          <ProgressiveImage
            source={{
              uri: `${TMBD_BACKDROP_URL}${backdrop_path}`,
            }}
            thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${backdrop_path}`}
            progressiveRenderingEnabled={true}
            containerProps={{
              style: {
                position: 'relative',
                borderRadius: 20,
                borderColor: '#dddddd35',
                borderWidth: 1,
              },
            }}
            style={{
              width: w || 200,
              height: h || 250,
            }}>
            <RenderIF condition={!!isSelected}>
              <S.Circle
                zIndex={20}
                p={2}
                backgroundColor="orange.500"
                position="absolute"
                top={-5}
                right={-5}>
                <Check size={10} color="#fff" />
              </S.Circle>
            </RenderIF>
          </ProgressiveImage>

          <S.Text fontWeight={500} color="#ddd" fontSize="md">
            {title}
          </S.Text>
        </S.VStack>
      </TouchableOpacity>
    </Animated.View>
  );
}
