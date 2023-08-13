import React from 'react';

import {Box, SearchHeader} from '@components';
import {useAppSafeArea} from '@hooks';

type Props = {
  searchText: string;
  onChangeText: (value: string) => void;
};

export function SelectMoviesHeader({searchText, onChangeText}: Props) {
  const {top} = useAppSafeArea();
  return (
    <Box px={'l'} my={'m'}>
      <SearchHeader
        boxStyle={{
          marginTop: top + 20,
        }}
        title="Selecione filmes para continuar."
        inputProps={{
          testID: 'search-input',
          value: searchText,
          onChangeText: onChangeText,
        }}
      />
    </Box>
  );
}
