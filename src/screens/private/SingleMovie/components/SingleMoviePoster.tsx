import React from 'react';

import {TMBD_BACKDROP_PREVIEW, TMBD_BACKDROP_URL} from '@constants';

import {Box, ProgressiveImage} from '@components';

interface PosterProps {
  imagePath: string;
}

export function SingleMoviePoster({imagePath}: PosterProps) {
  return (
    <Box width="100%" flex={2} position="relative">
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
    </Box>
  );
}
