import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Plus} from 'phosphor-react-native';

import {Box, SearchHeader, modalRef} from '@components';
import {useAppSafeArea} from '@hooks';

import {NewLibrary} from './NewLibrary';

type Props = {
  onSearch: (text: string) => void;
};

export function UserLibraryHeader({onSearch}: Props) {
  const {top} = useAppSafeArea();
  const navigation = useNavigation();

  function redirectToSelectMovies() {
    navigation.navigate('SelectMovies');
  }

  function openModal() {
    modalRef.current?.show(
      <NewLibrary redirectToSelectMovies={redirectToSelectMovies} />,
    );
  }

  return (
    <Box
      paddingHorizontal={'xl'}
      marginBottom="xl"
      style={{
        marginTop: top,
      }}>
      <SearchHeader
        title="Biblioteca de filmes"
        RightComponent={
          <TouchableOpacity testID="button-open" onPress={openModal}>
            <Plus size={25} color="#fff" weight="bold" />
          </TouchableOpacity>
        }
        inputProps={{
          testID: 'input',
          onChange: event => {
            const searchText = event.nativeEvent.text;
            onSearch(searchText);
          },
        }}
      />
    </Box>
  );
}
