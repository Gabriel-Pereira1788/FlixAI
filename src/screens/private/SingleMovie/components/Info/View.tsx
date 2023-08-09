import React from 'react';

import * as S from 'native-base';
import {Star} from 'phosphor-react-native';

import {makeVoteAverage} from '../../../../../helpers/utils/makeVoteAverage';
import {Movie} from '../../../../../models/Movie';

export default function Info({
  title,
  vote_average,
  vote_count,
  overview,
}: Movie) {
  const vote = makeVoteAverage(vote_count, vote_average);
  return (
    <S.VStack py={3} width="100%" overflow="hidden">
      <S.VStack padding={5} space={3}>
        <S.HStack space={2}>
          <S.Box testID="star-icon">
            <Star size={24} color="#eea12f" weight="fill" />
          </S.Box>

          <S.Text color="#fff" fontWeight={500}>
            {vote.toFixed(2)} ({vote_count})
          </S.Text>
        </S.HStack>
        <S.HStack alignItems="center" justifyContent="space-between">
          <S.Text fontWeight={500} fontSize="2xl" color="#fff">
            {title}
          </S.Text>
        </S.HStack>

        <S.Text
          textAlign="justify"
          color="#ffffff8a"
          fontSize="md"
          fontWeight={500}
          mt="5%">
          {overview}
        </S.Text>
      </S.VStack>
    </S.VStack>
  );
}
