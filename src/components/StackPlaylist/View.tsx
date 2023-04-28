import React from 'react';
import * as S from 'native-base';
import CardMovie from '../CardMovie/View';
import {Movie} from '../../models/Movie';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Realm} from '@realm/react';

interface StackPlaylistProps extends S.IStackProps {
  _id: Realm.BSON.ObjectId;
  title: string;
  listData: Movie[];
}

export default function StackPlaylist({
  _id,
  title,
  listData,
  ...rest
}: StackPlaylistProps) {
  console.log('listdata', listData[0]);
  const navigation = useNavigation();

  function redirectToList() {
    navigation.navigate('ListMovies', {idList: _id});
  }
  return (
    <TouchableOpacity onPress={redirectToList}>
      <S.VStack
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        {...rest}>
        <S.Text
          textAlign="left"
          color="#ffffffc3"
          fontWeight={600}
          fontSize="xl">
          {title}
        </S.Text>
        <S.VStack
          w="100%"
          space={4}
          position="relative"
          mb={40}
          alignItems="center"
          justifyContent="center">
          {listData &&
            listData
              .slice(0, 3)
              .reverse()
              .map((data, index) => {
                console.log(data.backdrop_path);
                return (
                  <CardMovie
                    key={data.id}
                    containerStyle={{
                      flex: 1,
                      position: 'absolute',
                      zIndex: 1000,
                      left: Math.abs(index * 10),
                      top: Math.abs(index * 15),
                    }}
                    {...data}
                    backdrop_path={data.backdrop_path}
                    title={data.title}
                    overview={data.overview}
                    vote_count={data.vote_count}
                    vote_average={data.vote_average}
                  />
                );
              })}
        </S.VStack>
      </S.VStack>
    </TouchableOpacity>
  );
}
