import React from 'react';
import SharedLayout from '../../../components/SharedLayout/View';
import * as S from 'native-base';
import {MoviesViewModel} from './model';
import {_useMovies} from './useMovies';

interface MoviesProps {
  useMovies?: MoviesViewModel;
}

export default function Movies({useMovies = _useMovies}: MoviesProps) {
  const {} = useMovies();
  return (
    <SharedLayout>
      <S.Text>teste</S.Text>
    </SharedLayout>
  );
}
