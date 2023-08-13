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
    <Box px="xl" my="l">
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
      width="100%"
      pt="sm"
      pb="one"
      px="m"
      alignItems="center"
      justifyContent="space-between">
      <Box gap="one">
        <Text color="grayDarkTextColor" fontSize={10}>
          Olá {user && user.name}
        </Text>
        <Text color="secondaryTextColor" fontWeight={'500'} fontSize={20}>
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
