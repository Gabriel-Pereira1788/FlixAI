import React from 'react';
import {NavigationProps} from '../../../router/navigation';
import * as S from 'native-base';
import SharedLayout from '../../../components/SharedLayout/View';
import {ListMoviesViewModel} from './model';
import {useListMovies as _useListMovies} from './useListMovies';
import SearchHeader from '../../../components/SearchHeader/View';
import List from './components/List/View';
import RenderIF from '../../../components/RenderIF/View';

interface ListMoviesProps extends NavigationProps<'ListMovies'> {
  useListMovies?: ListMoviesViewModel;
}

export default function ListMovies({
  route,
  useListMovies = _useListMovies,
}: ListMoviesProps) {
  const {idList} = route.params;
  const {dataMovies, title} = useListMovies({idList});
  return (
    <SharedLayout
      HeaderComponent={
        <S.Box px={10} my={10}>
          <SearchHeader
            title={title}
            onSearch={(value: string) => {
              console.log(value);
            }}
            titleProps={{
              fontSize: '3xl',
            }}
          />
        </S.Box>
      }>
      <RenderIF condition={!!dataMovies && dataMovies.length > 0}>
        <List dataMovies={dataMovies!} />
      </RenderIF>
    </SharedLayout>
  );
}
