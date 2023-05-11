import React from 'react';
import {ListRenderItem, StyleSheet, TouchableOpacity} from 'react-native';
import {SelectMoviesViewModel} from './model';
import * as S from 'native-base';
import {_useSelectMovies} from './useSelectMovies';

import RenderIF from '../../../components/RenderIF/View';
import SearchHeader from '../../../components/SearchHeader/View';
import SharedLayout from '../../../components/SharedLayout/View';
import {NavigationProps} from '../../../router/navigation';
import {BlurView} from '@react-native-community/blur';
import {CaretRight} from 'phosphor-react-native';
import {modalRef} from '../../../components/Modal/View';
import AddPlaylist from '../../../components/AddPlaylist/View';
import FilteredMovies from '../../../components/FilteredMovies/View';
import AllMovies from '../../../components/AllMovies/View';

import {SIZES} from '../../../helpers/constants/sizes';
import {Movie} from '../../../models/Movie';
import SelectedCardMovie from './components/SelectedCardMovie/View';

interface SelectMoviesProps extends NavigationProps<'SelectMovies'> {
  useSelectMovies?: SelectMoviesViewModel;
}
export default function SelectMovies({
  useSelectMovies = _useSelectMovies,
  navigation,
}: SelectMoviesProps) {
  const {
    dataMovies,
    error,
    loading,
    selectedMovies,
    searchText,
    handleChange,
    onCreate,
  } = useSelectMovies({
    navigation,
  });

  function openModal() {
    if (selectedMovies.length > 0) {
      modalRef.current?.show(
        () => <AddPlaylist listData={selectedMovies} onCreate={onCreate} />,
        'slide',
      );
    }
  }

  const renderItem: ListRenderItem<Movie> = React.useCallback(
    ({item, index}) => {
      return (
        <SelectedCardMovie
          testID="filter-selected-movie"
          w={SIZES.width - 50}
          h={SIZES.height / 2 - 20}
          key={index}
          dataMovie={item}
        />
      );
    },
    [],
  );

  const renderMoviesItem: ListRenderItem<Movie> = React.useCallback(
    ({item, index}) => {
      return <SelectedCardMovie key={index} dataMovie={item} />;
    },
    [],
  );
  return (
    <SharedLayout
      isLoadingData={loading}
      error={error}
      HeaderComponent={
        <S.Box px={10} my={6}>
          <SearchHeader
            title="Selecione filmes para continuar."
            inputProps={{
              testID: 'search-input',
              value: searchText,
              onChangeText: handleChange,
            }}
          />
        </S.Box>
      }>
      <S.VStack
        flex={1}
        backgroundColor="background.main"
        alignItems="center"
        justifyContent="center">
        <RenderIF condition={!loading && !!dataMovies}>
          <S.VStack flex={1}>
            <RenderIF
              condition={searchText.trim() === ''}
              AlternativeComponent={
                <FilteredMovies
                  movies={dataMovies!}
                  filter={{
                    text: searchText,
                    category: 'all',
                  }}
                  renderItem={renderItem}
                />
              }>
              <AllMovies
                dataMovies={dataMovies}
                renderItem={renderMoviesItem}
              />
            </RenderIF>

            <RenderIF condition={selectedMovies.length > 0}>
              <TouchableOpacity testID="open-modal" onPress={openModal}>
                <S.Circle
                  overflow="hidden"
                  p={4}
                  position="absolute"
                  bottom={5}
                  right={5}>
                  <BlurView
                    style={style.blurContainer}
                    blurType="dark"
                    blurAmount={20}
                  />
                  <CaretRight size={23} color="#f97316" weight="bold" />
                </S.Circle>
              </TouchableOpacity>
            </RenderIF>
          </S.VStack>
        </RenderIF>
      </S.VStack>
    </SharedLayout>
  );
}

export const style = StyleSheet.create({
  blurContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
