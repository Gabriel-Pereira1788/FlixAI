import React from 'react';

import {useCollectionCreate} from '@database';
import {fireEvent, render} from '@testing-library/react-native';
import {logger} from '@utils';

import {movies} from '../../../../../../../mocks/movies';
import JestProviders from '../../../../../../providers/JestProviders';
import {
  useSelectedMoviesStore,
  useMoviesByGenre,
  useToastActions,
  useSelectedMoviesActions,
} from '../../../../../../store';
import {UserLibraryCreateCollection} from '../UserLibraryCreateCollection';

const useSelectedMoviesMock = useSelectedMoviesStore as jest.Mock<
  ReturnType<typeof useSelectedMoviesStore>
>;

const useSelectedMoviesActionsMock = useSelectedMoviesActions as jest.Mock<any>;

const useMoviesByGenreMock = useMoviesByGenre as jest.Mock<any>;
const useToastActionsMock = useToastActions as jest.Mock<any>;
const useCollectionCreateMock = useCollectionCreate as jest.Mock<any>;
jest.useFakeTimers();

jest.mock('../../../../../../store/client/SelectMovies/useSelectedMoviesStore');
jest.mock('../../../../../../store/server/useMoviesByGenre');
jest.mock('../../../../../../store/client/ToastStore/useToastStore');

jest.mock(
  '../../../../../../repositories/database/useCases/Collection/useCollectionCreate',
);

const createNewCollection = jest.fn();
beforeAll(() => {
  useSelectedMoviesMock.mockImplementation(() => movies);
  useSelectedMoviesActionsMock.mockImplementation(() => ({
    removeToSelected: jest.fn(),
    addToSelected: jest.fn(),
  }));
  useMoviesByGenreMock.mockImplementation(() => ({
    data: movies,
  }));
  useToastActionsMock.mockImplementation(() => ({
    success: (message: string) => {
      logger.log(message);
    },
  }));

  useCollectionCreateMock.mockImplementation(() => ({
    createNewCollection,
  }));
});
// const handleChangeMock = jest.fn();

const handleRedirectScreenMock = jest.fn();
describe('UserLibraryCreateCollection', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <UserLibraryCreateCollection
          redirectToSelectMovies={handleRedirectScreenMock}
        />
      </JestProviders>,
    );

    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText('Criar nova biblioteca')).toBeTruthy();
    expect(getByText('Filmes populares')).toBeTruthy();
    expect(getByText('Selecione algums filmes para continuar')).toBeTruthy();
    expect(getByText('ver todos')).toBeTruthy();
  });

  it('press create button correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <JestProviders>
        <UserLibraryCreateCollection
          redirectToSelectMovies={handleRedirectScreenMock}
        />
      </JestProviders>,
    );

    const buttonConfirm = getByText('Confirmar');
    const inputTitle = getByPlaceholderText('Nome para biblioteca');
    fireEvent.changeText(inputTitle, 'John doe collection');
    fireEvent.press(buttonConfirm);
    expect(createNewCollection).toBeCalledWith('John doe collection', movies);
  });

  it('press redirect screen', () => {
    const {getByTestId} = render(
      <JestProviders>
        <UserLibraryCreateCollection
          redirectToSelectMovies={handleRedirectScreenMock}
        />
      </JestProviders>,
    );

    const buttonRedirect = getByTestId('button-redirect');
    fireEvent.press(buttonRedirect);
    expect(handleRedirectScreenMock).toBeCalled();
  });
});
