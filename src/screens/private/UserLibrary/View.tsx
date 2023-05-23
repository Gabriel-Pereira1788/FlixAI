import React from 'react';
import SharedLayout from '../../../components/SharedLayout/View';
import * as S from 'native-base';
import BottomTab from '../../../components/BottomTab/View';
import {useUserLibrary as _useUserLibrary} from './useUserLibrary';
import StackMovies from '../../../components/StackMovies/View';
import {SIZES} from '../../../helpers/constants/sizes';

import SearchHeader from '../../../components/SearchHeader/View';
import {TouchableOpacity} from 'react-native';
import {Plus} from 'phosphor-react-native';
import {modalRef} from '../../../components/Modal/View';
import NewLibrary from './components/NewLibrary/View';
import {UserLibraryViewModel} from './model';

interface Props {
  useUserLibrary?: UserLibraryViewModel;
}

export default function UserLibrary({useUserLibrary = _useUserLibrary}: Props) {
  const {
    allPlaylists,
    searchText,
    handleChangeText,
    redirectScreen,
    handleSelectLibrary,
  } = useUserLibrary({});

  function openModal() {
    modalRef.current?.show(() => (
      <NewLibrary redirectScreen={redirectScreen} />
    ));
  }
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={4}>
          <SearchHeader
            title="Biblioteca de filmes"
            titleProps={{
              fontSize: '3xl',
            }}
            RightComponent={
              <TouchableOpacity testID="button-open" onPress={openModal}>
                <Plus size={25} color="#fff" weight="bold" />
              </TouchableOpacity>
            }
            inputProps={{
              testID: 'input',
              value: searchText,
              onChangeText: handleChangeText,
            }}
          />
        </S.Box>
      }
      BottomComponent={<BottomTab currentPath="userLibrary" />}
      containerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {allPlaylists && allPlaylists.length > 0 && (
        <S.FlatList
          data={allPlaylists}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: SIZES.width,
          }}
          renderItem={({item}) => (
            <StackMovies
              title={item.title}
              moviesList={item.movies}
              alignItems="flex-start"
              width={SIZES.width - 50}
              onPress={() => handleSelectLibrary(item._id)}
            />
          )}
        />
      )}
    </SharedLayout>
  );
}
