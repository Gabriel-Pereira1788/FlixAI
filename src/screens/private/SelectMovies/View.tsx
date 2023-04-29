import React from 'react';
import {SelectMoviesViewModel} from './model';
import * as S from 'native-base';
import {_useSelectMovies} from './useSelectMovies';

import RenderIF from '../../../components/RenderIF/View';
import AllMovies from './components/AllMovies/View';
import SearchHeader from '../../../components/SearchHeader/View';
import SharedLayout from '../../../components/SharedLayout/View';
import {NavigationProps} from '../../../router/navigation';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {CaretRight} from 'phosphor-react-native';
import {modalRef} from '../../../components/Modal/View';
import AddPlaylist from '../../../components/AddPlaylist/View';

interface SelectMoviesProps extends NavigationProps<'SelectMovies'> {
  useSelectMovies?: SelectMoviesViewModel;
}
export default function SelectMovies({
  useSelectMovies = _useSelectMovies,
  navigation,
}: SelectMoviesProps) {
  const {dataMovies, loading, selectedMovies, onCreate} = useSelectMovies({
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
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={6}>
          <SearchHeader
            title="Selecione filmes para continuar."
            onSearch={(value: string) => {
              console.log(value);
            }}
          />
        </S.Box>
      }>
      <S.VStack
        flex={1}
        backgroundColor="background.main"
        alignItems="center"
        justifyContent="center">
        <RenderIF
          condition={!loading && !!dataMovies}
          AlternativeComponent={<S.Spinner size="lg" color="orange.500" />}>
          <S.VStack flex={1}>
            <AllMovies dataMovies={dataMovies} />

            <RenderIF condition={selectedMovies.length > 0}>
              <TouchableOpacity onPress={openModal}>
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
