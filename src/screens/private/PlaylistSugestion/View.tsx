import React from 'react';
import * as S from 'native-base';
import {usePlaylistSugestion as _usePlaylistSugestion} from './usePlaylistSugestion';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {PlaylistSugestionViewModel} from './models';
//*components
import CardMovie from '../../../components/CardMovie/View';
import RenderIF from '../../../components/RenderIF/View';
import {modalRef} from '../../../components/Modal/View';
import AddPlaylist from '../../../components/AddPlaylist/View';
import AddToPlaylist from './components/AddToPlaylist/View';
import BottomTab from '../../../components/BottomTab/View';
import SharedLayout from '../../../components/SharedLayout/View';
import SearchHeader from '../../../components/SearchHeader/View';

type Props = {
  usePlaylistSugestion?: PlaylistSugestionViewModel;
};

export default function PlaylistSugestion({
  usePlaylistSugestion = _usePlaylistSugestion,
}: Props) {
  const {data, textGpt, isLoading, onSearch, onCreate, redirectScreen} =
    usePlaylistSugestion();

  function openModal() {
    if (data && data.length > 0) {
      modalRef.current?.show(
        () => <AddPlaylist listData={data} onCreate={onCreate} />,
        'slide',
      );
    }
  }
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} paddingTop={10}>
          <SearchHeader
            onSearch={onSearch}
            title={textGpt || 'Olá gabriel oque precisa para hoje?'}
          />
        </S.Box>
      }
      BottomComponent={<BottomTab currentPath="sugestions" />}>
      <RenderIF condition={!isLoading && !!data && data.length > 0}>
        {data && data.length > 0 && (
          <S.FlatList
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={data!}
            contentContainerStyle={styles.list}
            renderItem={({item, index}) => (
              <CardMovie
                index={index}
                {...item}
                stackStyle={{marginY: '5%'}}
                onPress={redirectScreen(item.id)}
              />
            )}
          />
        )}
        <S.HStack
          position="absolute"
          zIndex={10}
          style={{bottom: '7%'}}
          w="100%"
          p={5}
          px={6}
          alignItems="center"
          justifyContent="flex-start">
          <Animated.View
            style={{marginLeft: 10}}
            entering={FadeInDown.delay(500).duration(150)}>
            <AddToPlaylist onPress={openModal} />
          </Animated.View>
        </S.HStack>
      </RenderIF>
    </SharedLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flexGrow: 1,
    marginBottom: '30%',
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
