import React from 'react';

import {TMBD_BACKDROP_PREVIEW, TMBD_BACKDROP_URL} from '@constants';
import {Cast} from '@models';

import {Box, ProgressiveImage, RenderIF, Text} from '@components';

export function SingleMovieCardCast({profile_path, name}: Cast) {
  return (
    <Box
      testID="card-cast"
      mx={'s'}
      gap={'one'}
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

      <Text
        textAlign="justify"
        color="grayDarkTextColor2"
        fontSize={13}
        fontWeight={'500'}>
        {name}
      </Text>
    </Box>
  );
}
