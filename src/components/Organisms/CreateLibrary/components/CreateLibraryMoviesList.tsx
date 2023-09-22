import React from 'react';
import {ViewStyle} from 'react-native';

import {Box, CardMovie} from '@components';

import {CreateLibraryProps} from '../types';

type Props = Pick<CreateLibraryProps, 'moviesListToAdd'> & {};

export function CreateLibraryMoviesList({moviesListToAdd}: Props) {
  // console.log(moviesListToAdd)
  return (
    <Box
      width="100%"
      gap={'xs'}
      marginBottom="xxl"
      style={{
        marginBottom: 175,
      }}
      alignItems="center"
      justifyContent="center">
      {moviesListToAdd &&
        moviesListToAdd
          .slice(0, 3)
          .reverse()
          .map((data, index) => {
            return (
              <CardMovie
                key={data.id}
                {...data}
                containerStyle={$buildContainerStyle(index)}
              />
            );
          })}
    </Box>
  );
}

const $buildContainerStyle = (index: number): ViewStyle => ({
  flex: 1,
  position: 'absolute',
  zIndex: 1000,
  left: Math.abs(index * 10),
  top: Math.abs(index * 15),
});
