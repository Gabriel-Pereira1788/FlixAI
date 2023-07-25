import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CardMovie} from '@components/molecules';
import {Movie} from '@models';
import {Box, Text, IBoxProps} from '@components/atoms';

interface StackMoviesProps extends IBoxProps {
  title: string;
  moviesList: Movie[];
  onPress?: () => void;
}

export function StackMovies({
  title,
  moviesList,
  onPress,
  ...rest
}: StackMoviesProps) {
  return (
    <TouchableOpacity testID="stackElement" onPress={onPress}>
      <Box
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        {...rest}>
        <Text variant="stackTitle">{title}</Text>
        <Box
          testID="stack-movies"
          width="100%"
          gap="s"
          position="relative"
          marginBottom={'xxl'}
          alignItems="center"
          justifyContent="center">
          {moviesList &&
            moviesList
              .slice(0, 3)
              .reverse()
              .map((data, index) => {
                console.log(data.backdrop_path);
                return (
                  <CardMovie
                    testID="movie"
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
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
