import React from 'react';
import SharedLayout from '../../../components/SharedLayout/View';
import * as S from 'native-base';
import BottomTab from '../../../components/BottomTab/View';
import {useAllPlaylist} from './useAllPlaylist';
import StackPlaylist from '../../../components/StackPlaylist/View';
import {SIZES} from '../../../helpers/constants/sizes';

import SearchHeader from '../../../components/SearchHeader/View';
import {TouchableOpacity} from 'react-native';
import {Plus} from 'phosphor-react-native';
import {modalRef} from '../../../components/Modal/View';
import CreatePlaylist from './components/CreatePlaylist/View';
type Props = {};

export default function AllPlaylist({}: Props) {
  const {allPlaylists, redirectScreen} = useAllPlaylist();

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
              <TouchableOpacity onPress={openModal}>
                <Plus size={25} color="#fff" weight="bold" />
              </TouchableOpacity>
            }
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
          keyExtractor={item => `${item._id.id}`}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: SIZES.width,
          }}
          renderItem={({item}) => (
            <StackPlaylist
              _id={item._id}
              title={item.title}
              listData={item.movies}
              alignItems="flex-start"
              width={SIZES.width - 50}
            />
          )}
        />
      )}
    </SharedLayout>
  );
}
