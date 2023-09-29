import React from 'react';
import {Text} from 'react-native';

import {render} from '@testing-library/react-native';
import {PanGesture, State} from 'react-native-gesture-handler';
import {fireGestureHandler} from 'react-native-gesture-handler/jest-utils';

import JestProviders from '../../../../../providers/JestProviders';
import {SingleMovieWrapperContent} from '../SingleMovieWrapperContent';
jest.useFakeTimers();
jest.unmock('react-native-reanimated');
jest.unmock('react-native-gesture-handler');
describe('SingleMovieWrapperContent', () => {
  it('render correclty', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <SingleMovieWrapperContent>
          <Text>Simple message</Text>
        </SingleMovieWrapperContent>
      </JestProviders>,
    );

    expect(getByText('Simple message')).toBeTruthy();
    expect(getByTestId('gesture-element')).toBeTruthy();
    expect(getByTestId('arrow-rotate')).toBeTruthy();
  });
  it('handle toggleMostView for expanded information to movie and resume informations', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SingleMovieWrapperContent>
          <Text>Simple message</Text>
        </SingleMovieWrapperContent>
      </JestProviders>,
    );

    const gestureElement = getByTestId('gesture-element');
    const arrowAnimatedElement = getByTestId('arrow-rotate');

    expect(arrowAnimatedElement).toHaveAnimatedStyle({
      transform: [{rotate: '0deg'}],
    });

    fireGestureHandler<PanGesture>(gestureElement, [
      {state: State.BEGAN, translationY: 0},
      {state: State.ACTIVE, translationY: 20},
      {translationY: 50},
      {translationY: 70},
      {state: State.END, translationY: 70},
    ]);

    fireGestureHandler<PanGesture>(gestureElement, [
      {state: State.BEGAN, translationY: 70},
      {state: State.ACTIVE, translationY: 50},
      {translationY: 20},
      {translationY: 0},
      {state: State.END, translationY: 0},
    ]);

    jest.advanceTimersByTime(500);
    expect(arrowAnimatedElement).toHaveAnimatedStyle({
      transform: [{rotate: '180deg'}],
    });
  });
});
