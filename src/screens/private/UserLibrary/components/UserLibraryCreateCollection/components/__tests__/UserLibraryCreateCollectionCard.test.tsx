import React from 'react';

import {movies} from '@mocks';
import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../../../../providers/JestProviders';
import {UserLibraryCreateCollectionCard} from '../UserLibraryCreateCollectionCard';

const toggleSelectedMock = jest.fn();
describe('UserLibraryCreateCollectionCard', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <UserLibraryCreateCollectionCard
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
        <UserLibraryCreateCollectionCard
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
        <UserLibraryCreateCollectionCard
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
