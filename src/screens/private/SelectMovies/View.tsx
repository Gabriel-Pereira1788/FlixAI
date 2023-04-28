import React from 'react';
import {SelectMoviesViewModel} from './model';
import * as S from 'native-base';
import {_useSelectMovies} from './useSelectMovies';

import RenderIF from '../../../components/RenderIF/View';
import AllMovies from './components/AllMovies/View';
import SearchHeader from '../../../components/SearchHeader/View';
import SharedLayout from '../../../components/SharedLayout/View';
import {NavigationProps} from '../../../router/navigation';

interface SelectMoviesProps extends NavigationProps<'SelectMovies'> {
  useSelectMovies?: SelectMoviesViewModel;
}
export default function SelectMovies({
  useSelectMovies = _useSelectMovies,
  navigation,
}: SelectMoviesProps) {
  const {dataMovies, loading} = useSelectMovies({navigation});
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
          <AllMovies dataMovies={dataMovies} />
        </RenderIF>
      </S.VStack>
    </SharedLayout>
  );
}
