import React from 'react';

import {render} from '@testing-library/react-native';

import {allPlaylistMock} from '../../../../../../../mocks/useCasePlaylist';
import {mockUseRealm} from '../../../../../../../mocks/useRealm';
import JestProviders from '../../../../../../providers/JestProviders';
import DeleteLibrary from '../View';

const goBack = jest.fn();

describe('DeleteLibrary', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <DeleteLibrary
          goBack={goBack}
          library={allPlaylistMock[0]}
          useRealmImpl={mockUseRealm}
        />
      </JestProviders>,
    );

    expect(getByText(allPlaylistMock[0].title)).toBeTruthy();
  });
});
