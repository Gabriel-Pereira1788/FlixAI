import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import Header from '../View';
import {UserImpl} from '../../../../../../store/server/useUser';
import {userMock} from '../../../../../../../mocks/user';
const mockUseUser: UserImpl = () => ({
  error: null,
  isLoading: false,
  user: userMock,
});
describe('Header', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <Header useUser={mockUseUser} />
      </JestProviders>,
    );
    const imageElement = getByTestId('image-user');
    expect(getByText('Olá John doe')).toBeTruthy();

    expect(imageElement.props.source.uri).toEqual(userMock.photoURL);
  });

  it('render component without image user', () => {
    const mockUseUser: UserImpl = () => ({
      error: null,
      isLoading: false,
      user: undefined,
    });
    const {queryByTestId} = render(
      <JestProviders>
        <Header useUser={mockUseUser} />
      </JestProviders>,
    );
    const imageElement = queryByTestId('image-user');

    expect(imageElement).toBeNull();
  });
});
