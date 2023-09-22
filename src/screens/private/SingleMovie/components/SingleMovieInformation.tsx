import React from 'react';

import {Movie} from '@models';
import {makeVoteAverage} from '@utils';
import {Star} from 'phosphor-react-native';

import {Box, Text} from '@components';

type Props = {
  movie: Movie;
};

export function SingleMovieInformation({movie}: Props) {
  const {title, vote_average, vote_count, overview} = movie;
  const vote = makeVoteAverage(vote_count, vote_average);
  return (
    <Box py={'sm'} width="100%" overflow="hidden">
      <Box paddingHorizontal="m" gap={'s'}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Box testID="star-icon" flexDirection="row">
            <Star size={24} color="#eea12f" weight="fill" />
            <Text ml="s" color="white" fontWeight={'500'}>
              {vote.toFixed(2)} ({vote_count})
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text
            preset="headingSmall"
            paddingTop="l"
            lineHeight={30}
            fontWeight={'500'}
            fontSize={25}
            color="white">
            {title}
          </Text>
        </Box>

        <Text
          lineHeight={30}
          textAlign="justify"
          color="grayDarkTextColor2"
          fontSize={20}
          fontWeight={'500'}
          style={{marginTop: '5%'}}>
          {overview}
        </Text>
      </Box>
    </Box>
  );
}
