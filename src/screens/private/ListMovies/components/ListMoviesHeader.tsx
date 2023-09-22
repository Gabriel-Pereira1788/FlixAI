import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Trash} from 'phosphor-react-native';

import {Box, SearchHeader} from '@components';

type Props = {
  title: string;
  handleOnSearch: (value: string) => void;
  openModal: () => void;
};

export function ListMoviesHeader({title, handleOnSearch, openModal}: Props) {
  return (
    <Box paddingHorizontal={'xl'} marginVertical={'xl'}>
      <SearchHeader
        title={title}
        listenEventSearch={handleOnSearch}
        RightComponent={
          <TouchableOpacity testID="trash-icon" onPress={openModal}>
            <Trash color="#fff" size={25} weight="bold" />
          </TouchableOpacity>
        }
      />
    </Box>
  );
}
