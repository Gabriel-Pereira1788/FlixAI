import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../../../mocks/movies';
import {allPlaylistMock} from '../../../../../../../mocks/useCasePlaylist';
import JestProviders from '../../../../../../providers/JestProviders';
import {AddModalViewModel} from '../models';
import AddModal from '../View';

const handleChange = jest.fn();
const onAdd = jest.fn();

const mockUseAddModal: AddModalViewModel = () => ({
  dataPlaylist: allPlaylistMock,
  handleChange,
  idPlaylist: '123',
  onAdd,
});
describe('AddModal', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <AddModal movie={movies[0]} useAddModal={mockUseAddModal} />
      </JestProviders>,
    );

    expect(getByText('Confirmar')).toBeTruthy();
    expect(getByText(movies[0].title)).toBeTruthy();
  });

  it('call change function correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <AddModal movie={movies[0]} useAddModal={mockUseAddModal} />
      </JestProviders>,
    );
    const select = getByTestId('select');

    fireEvent(select, 'onValueChange', 'teste');

    expect(handleChange).toBeCalledWith('teste');
  });

  it('press button confirm and call onAdd function', () => {
    const {getByText} = render(
      <JestProviders>
        <AddModal movie={movies[0]} useAddModal={mockUseAddModal} />
      </JestProviders>,
    );
    const button = getByText('Confirmar');

    fireEvent.press(button);

    expect(onAdd).toBeCalledTimes(1);
  });
});
