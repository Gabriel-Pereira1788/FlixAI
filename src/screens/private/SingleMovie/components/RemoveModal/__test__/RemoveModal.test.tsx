import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {movies} from '../../../../../../../mocks/movies';
import {allPlaylistMock} from '../../../../../../../mocks/useCasePlaylist';
import JestProviders from '../../../../../../providers/JestProviders';
import {RemoveModalViewModel} from '../model';
import RemoveModal from '../View';

const handleChange = jest.fn();
const onRemove = jest.fn();
const mockUseRemoveModal: RemoveModalViewModel = () => ({
  handleChange,
  onRemove,
  selectedPlaylist: null,
});
describe('RemoveModal', () => {
  it('render component correctly', () => {
    const {getByText, getAllByTestId} = render(
      <JestProviders>
        <RemoveModal
          movie={movies[0]}
          playlist={allPlaylistMock}
          useRemoveModalImpl={mockUseRemoveModal}
        />
      </JestProviders>,
    );

    const selectItems = getAllByTestId('select-item');
    expect(getByText('Remover de:')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
    expect(selectItems.length).toEqual(allPlaylistMock.length);
  });

  it('call change function on select element', () => {
    const {getByTestId} = render(
      <JestProviders>
        <RemoveModal
          movie={movies[0]}
          playlist={allPlaylistMock}
          useRemoveModalImpl={mockUseRemoveModal}
        />
      </JestProviders>,
    );

    const select = getByTestId('select');
    fireEvent(select, 'onValueChange', 'John doe');
    expect(handleChange).toBeCalledWith('John doe');
  });

  it('press confirm button to call remove method', () => {
    const {getByText} = render(
      <JestProviders>
        <RemoveModal
          movie={movies[0]}
          playlist={allPlaylistMock}
          useRemoveModalImpl={mockUseRemoveModal}
        />
      </JestProviders>,
    );

    const confirmButton = getByText('Confirmar');
    fireEvent.press(confirmButton);

    expect(onRemove).toBeCalledTimes(1);
  });
});
