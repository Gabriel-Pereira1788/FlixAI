import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useUser} from '@store';
import {UserCircle} from 'phosphor-react-native';

import {Box, Image, RenderIF, SearchBar, Text} from '@components';

type Props = {
  onFilter: (filterData: Filter) => void;
  filterText: string;
};

export function MoviesHeader({filterText, onFilter}: Props) {
  //TODO: use app safe area for make the header correctly
  return (
    <Box px="l" my="l" width="100%">
      <WelcomeUser />
      <SearchBar
        testID="input-search"
        placeholder="Pesquise aqui"
        placeholderTextColor="#ddd"
        value={filterText}
        onChangeText={value =>
          onFilter({
            text: value,
          })
        }
      />
    </Box>
  );
}

function WelcomeUser() {
  const {user} = useUser();
  return (
    <Box
      flexDirection="row"
      pt="sm"
      pb="one"
      px="m"
      alignItems="center"
      justifyContent="space-between">
      <Box gap="one">
        <Text preset="headingMedium" color="grayDarkTextColor" fontSize={10}>
          Olá {user && user.name}
        </Text>
        <Text preset="paragraphMedium" color="secondaryTextColor">
          Relaxe e escolha um filme...
        </Text>
      </Box>
      <TouchableOpacity>
        <RenderIF
          condition={!!user && !!user.photoURL}
          AlternativeComponent={
            <UserCircle size={25} color="#fff" weight="bold" />
          }>
          <Image
            testID="image-user"
            source={{uri: !!user && user.photoURL ? user!.photoURL! : ''}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            alt="image-user"
          />
        </RenderIF>
      </TouchableOpacity>
    </Box>
  );
}
