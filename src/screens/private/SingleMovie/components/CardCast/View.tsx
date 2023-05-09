import React from 'react';

import * as S from 'native-base';

import RenderIF from '../../../../../components/RenderIF/View';
import ProgressiveImage from '../../../../../components/ProgressiveImage/View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../../../helpers/constants/tmdb';
import {Cast} from '../../../../../models/Cast';

export default function CardCast({profile_path, name}: Cast) {
  return (
    <S.VStack
      testID="card-cast"
      mx={3}
      space={2}
      alignItems="center"
      justifyContent="center">
      <RenderIF condition={!!profile_path}>
        <ProgressiveImage
          testID="image-card"
          source={{
            uri: `${TMBD_BACKDROP_URL}${profile_path}`,
          }}
          thumbnailSource={`${TMBD_BACKDROP_PREVIEW}${profile_path}`}
          progressiveRenderingEnabled={true}
          containerProps={{
            style: {
              borderRadius: 20,
              borderColor: '#dddddd35',
              borderWidth: 1,
            },
          }}
          style={{
            width: 150,
            height: 200,
          }}
        />
      </RenderIF>

      <S.Text
        textAlign="justify"
        color="#ffffff8a"
        fontSize="md"
        fontWeight={500}>
        {name}
      </S.Text>
    </S.VStack>
  );
}
