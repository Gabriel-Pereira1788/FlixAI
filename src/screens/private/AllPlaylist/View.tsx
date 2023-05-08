import React from 'react';
import SharedLayout from '../../../components/SharedLayout/View';
import * as S from 'native-base';
import BottomTab from '../../../components/BottomTab/View';
import {useAllPlaylist as _useAllPlaylist} from './useAllPlaylist';
import StackPlaylist from '../../../components/StackPlaylist/View';
import {SIZES} from '../../../helpers/constants/sizes';

import SearchHeader from '../../../components/SearchHeader/View';
import {TouchableOpacity} from 'react-native';
import {Plus} from 'phosphor-react-native';
import {modalRef} from '../../../components/Modal/View';
import CreatePlaylist from './components/CreatePlaylist/View';
import {AllPlaylistViewModel} from './model';

interface Props {
  useAllPlaylist?: AllPlaylistViewModel;
}

export default function AllPlaylist({useAllPlaylist = _useAllPlaylist}: Props) {
  const {
    allPlaylists,
    searchText,
    handleChangeText,
    redirectScreen,
    handleSelectPlaylist,
  } = useAllPlaylist({});

  function openModal() {
    modalRef.current?.show(() => (
      <CreatePlaylist redirectScreen={redirectScreen} />
    ));
  }
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={4}>
          <SearchHeader
            title="Playlist"
            onSearch={(value: string) => {
              console.log(value);
            }}
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
      BottomComponent={<BottomTab currentPath="allPlaylist" />}
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
            <StackPlaylist
              title={item.title}
              listData={item.movies}
              alignItems="flex-start"
              width={SIZES.width - 50}
              onPress={() => handleSelectPlaylist(item._id)}
            />
          )}
        />
      )}
    </SharedLayout>
  );
}
