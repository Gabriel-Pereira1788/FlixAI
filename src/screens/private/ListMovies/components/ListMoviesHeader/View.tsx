import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Trash} from 'phosphor-react-native';

import {Box, SearchHeader, modalRef} from '@components';

import {ListMoviesViewModel} from '../../model';
import DeleteLibrary from '../DeleteLibrary/View';

type Props = {
  title: string;
  handleOnSearch: (value: string) => void;
  library: ReturnType<ListMoviesViewModel>['library'];
};

export function ListMoviesHeader({title, library, handleOnSearch}: Props) {
  const navigation = useNavigation();
  function openModal() {
    modalRef.current?.show(
      <DeleteLibrary library={library} goBack={navigation.goBack} />,
    );
  }
  return (
    <Box paddingHorizontal={'xl'} marginVertical={'xl'}>
      <SearchHeader
        title={title}
        listenEventSearch={handleOnSearch}
        RightComponent={
          <TouchableOpacity onPress={openModal}>
            <Trash color="#fff" size={25} weight="bold" />
          </TouchableOpacity>
        }
      />
    </Box>
  );
}
