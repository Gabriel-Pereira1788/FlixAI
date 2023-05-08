import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import CreatePlaylist from '../View';
import {CreatePlaylistViewModel} from '../model';
import {movies} from '../../../../../../../mocks/movies';

const redirectScreen = jest.fn();

const handleChangeMock = jest.fn();
const handleCreate = jest.fn();

const useCreatePlaylistMock: CreatePlaylistViewModel = () => ({
  popularMovies: movies,
  titlePlaylist: '',
  handleChangeText: handleChangeMock,
  handleCreate: handleCreate,
  loading: false,
});
describe('CreatePlaylist', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <CreatePlaylist
          redirectScreen={redirectScreen}
          useCreatePlaylist={useCreatePlaylistMock}
        />
      </JestProviders>,
    );

    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText('Criar nova playlist')).toBeTruthy();
    expect(getByText('Filmes populares.')).toBeTruthy();
    expect(getByText('Selecione algums filmes para continuar')).toBeTruthy();
    expect(getByText('ver todos')).toBeTruthy();
  });
});
