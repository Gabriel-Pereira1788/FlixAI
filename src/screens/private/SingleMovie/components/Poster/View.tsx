import React from 'react';
import * as S from 'native-base';
import ProgressiveImage from '../../../../../components/Molecules/ProgressiveImage/View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../../../helpers/constants/tmdb';

interface PosterProps {
  imagePath: string;
}

export default function Poster({imagePath}: PosterProps) {
  return (
    <S.Box width="100%" flex={2} position="relative">
      <ProgressiveImage
        testID="poster-image"
        source={{uri: `${TMBD_BACKDROP_URL}${imagePath}`}}
        thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${imagePath}`}
        progressiveRenderingEnabled={true}
        style={{flex: 1, width: '100%', height: '100%'}}
        containerProps={{
          width: '100%',
          height: '100%',
        }}
        alt="image-movie"
      />
    </S.Box>
  );
}
