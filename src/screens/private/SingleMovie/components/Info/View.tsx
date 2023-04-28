import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import {Star} from 'phosphor-react-native';

export default function Info({
  title,
  vote_average,
  vote_count,
  overview,
}: Movie) {
  const min_vote = 100;
  const max_average = 10;

  const vote =
    (vote_count! / (vote_count! + min_vote)) *
    (vote_average! / max_average) *
    5;
  return (
    <S.VStack py={3} width="100%" overflow="hidden">
      <S.VStack padding={5} space={3}>
        <S.HStack space={2}>
          <Star size={24} color="#eea12f" weight="fill" />

          <S.Text color="#fff" fontWeight={500}>
            {vote.toFixed(2)} ({vote_count})
          </S.Text>
        </S.HStack>
        <S.HStack alignItems="center" justifyContent="space-between">
          <S.Text fontWeight={500} fontSize="2xl" color="#fff">
            {title}
          </S.Text>
        </S.HStack>
        {/*  <S.HStack
          w="100%"
          alignItems="center"
          justifyContent="flex-start"
          space={3}>
          {genres &&
            genres.length > 0 &&
            genres.slice(0, 3).map(({id, name}) => {
              return (
                <S.Box
                  mt={3}
                  key={id}
                  shadow={5}
                  px={3}
                  py={2}
                  backgroundColor="#1e1e2c"
                  borderRadius="2xl">
                  <S.Text fontWeight={500} color="#ffffffc3" fontSize="md">
                    {name}
                  </S.Text>
                </S.Box>
              );
            })}
        </S.HStack> */}

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
