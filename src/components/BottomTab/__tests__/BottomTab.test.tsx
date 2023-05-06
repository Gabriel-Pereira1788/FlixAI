import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import BottomTab from '../View';
import {mockedNavigate} from '../../../../jestSetup';

describe('BottomTab', () => {
  it('render component correctly in movies path', () => {
    const {getByTestId} = render(
      <JestProviders>
        <BottomTab currentPath="movies" />
      </JestProviders>,
    );

    const element = getByTestId('moviesId');
    fireEvent.press(element);
    expect(element).toBeTruthy();
    expect(mockedNavigate).toBeCalledWith('Home', {screen: 'movies'});
  });

  it('render component correctly in allPlaylist path', () => {
    const {getByTestId} = render(
      <JestProviders>
        <BottomTab currentPath="allPlaylist" />
      </JestProviders>,
    );

    const element = getByTestId('allPlaylistId');
    fireEvent.press(element);
    expect(element).toBeTruthy();
    expect(mockedNavigate).toBeCalledWith('Home', {screen: 'allPlaylist'});
  });

  it('render component correctly in sugestions path', () => {
    const {getByTestId} = render(
      <JestProviders>
        <BottomTab currentPath="sugestions" />
      </JestProviders>,
    );

    const element = getByTestId('sugestions');
    fireEvent.press(element);
    expect(element).toBeTruthy();
    expect(mockedNavigate).toBeCalledWith('Home', {screen: 'sugestions'});
  });
});
