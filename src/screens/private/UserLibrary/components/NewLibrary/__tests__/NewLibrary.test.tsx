import React from 'react';

import {render} from '@testing-library/react-native';

import {movies} from '../../../../../../../mocks/movies';
import JestProviders from '../../../../../../providers/JestProviders';
import {NewLibrary} from '../NewLibrary.view';
import {ViewModel} from '../types';

// const handleChangeMock = jest.fn();
const createLibrary = jest.fn();

const viewModel: ViewModel = {
  onCreateLibrary: createLibrary,
};

const handleRedirectScreenMock = jest.fn();
describe('NewLibrary', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <NewLibrary
          viewModel={viewModel}
          handleRedirectScreen={handleRedirectScreenMock}
          popularMovies={movies}
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
