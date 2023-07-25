import {Box, SearchHeader, modalRef} from '@components';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import DeleteLibrary from '../DeleteLibrary/View';
import {useNavigation} from '@react-navigation/native';
import {ListMoviesViewModel} from '../../model';
import {Trash} from 'phosphor-react-native';

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
