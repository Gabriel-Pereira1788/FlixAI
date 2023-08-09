import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Plus} from 'phosphor-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, SearchHeader, modalRef} from '@components';

import {NewLibrary} from './NewLibrary';

type Props = {
  onSearch: (text: string) => void;
};

export function UserLibraryHeader({onSearch}: Props) {
  const {top} = useSafeAreaInsets();

  function openModal() {
    modalRef.current?.show(<NewLibrary />);
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
