import React from 'react';

import {allPlaylistMock} from '@mocks';
import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../../providers/JestProviders';
import {ListMoviesConfirmDelete} from '../ListMoviesConfirmDelete';

const onConfirmationMock = jest.fn();

const libraryMock = allPlaylistMock[0];
describe('ListMoviesConfirmDelete', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ListMoviesConfirmDelete
          library={libraryMock}
          onConfirmation={onConfirmationMock}
        />
      </JestProviders>,
    );

    expect(getByText(libraryMock.title)).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
  });

  it('press confirm button correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <ListMoviesConfirmDelete
          library={libraryMock}
          onConfirmation={onConfirmationMock}
        />
      </JestProviders>,
    );

    const buttonConfirm = getByText('Confirmar');

    fireEvent.press(buttonConfirm);
    expect(onConfirmationMock).toBeCalled();
  });
});
