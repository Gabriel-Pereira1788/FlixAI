import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {mockedNavigate} from '../../../../../jestSetup';
import JestProviders from '../../../../providers/JestProviders';
import {BottomTab} from '../View';

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

  it('render component correctly in userLibrary path', () => {
    const {getByTestId} = render(
      <JestProviders>
        <BottomTab currentPath="userLibrary" />
      </JestProviders>,
    );

    const element = getByTestId('userLibraryId');
    fireEvent.press(element);
    expect(element).toBeTruthy();
    expect(mockedNavigate).toBeCalledWith('Home', {screen: 'userLibrary'});
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
