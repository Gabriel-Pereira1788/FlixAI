import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import CreatePlaylist from '../View';
import {NewLibraryViewModel} from '../model';
import {movies} from '../../../../../../../mocks/movies';

const redirectScreen = jest.fn();

const handleChangeMock = jest.fn();
const createLibrary = jest.fn();

const useNewLibraryMock: NewLibraryViewModel = () => ({
  popularMovies: movies,
  titleLibrary: '',
  handleChangeText: handleChangeMock,
  createLibrary: createLibrary,
  loading: false,
});
describe('CreatePlaylist', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <CreatePlaylist
          redirectScreen={redirectScreen}
          useNewLibrary={useNewLibraryMock}
        />
      </JestProviders>,
    );

    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText('Criar nova biblioteca')).toBeTruthy();
    expect(getByText('Filmes populares.')).toBeTruthy();
    expect(getByText('Selecione algums filmes para continuar')).toBeTruthy();
    expect(getByText('ver todos')).toBeTruthy();
  });
});
