import React from 'react';

import {movies} from '@mocks';
import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../../../../providers/JestProviders';
import {NewLibraryCardMovie} from '../NewLibraryCardMovie';

const toggleSelectedMock = jest.fn();
describe('NewLibraryCardMovie', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <NewLibraryCardMovie
          isSelected={true}
          toggleSelected={toggleSelectedMock}
          {...movies[0]}
        />
      </JestProviders>,
    );

    expect(getByTestId('icon-selected')).toBeTruthy();
  });

  it('render component if unselected', () => {
    const {queryByTestId} = render(
      <JestProviders>
        <NewLibraryCardMovie
          isSelected={false}
          toggleSelected={toggleSelectedMock}
          {...movies[0]}
        />
      </JestProviders>,
    );

    expect(queryByTestId('icon-selected')).toBeFalsy();
  });

  it('click component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <NewLibraryCardMovie
          isSelected={true}
          toggleSelected={toggleSelectedMock}
          {...movies[0]}
        />
      </JestProviders>,
    );
    const card = getByTestId('select-card');
    fireEvent.press(card);
    expect(toggleSelectedMock).toBeCalled();
  });
});
