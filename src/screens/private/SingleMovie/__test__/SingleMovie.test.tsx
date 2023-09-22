import React from 'react';

import {render} from '@testing-library/react-native';
import {PanGesture, State} from 'react-native-gesture-handler';
import {fireGestureHandler} from 'react-native-gesture-handler/jest-utils';

import {movies} from '../../../../../mocks/movies';
import {mockUseCasePlaylist} from '../../../../../mocks/useCasePlaylist';
import {makeVoteAverage} from '../../../../helpers/utils/makeVoteAverage';
import JestProviders from '../../../../providers/JestProviders';
import {SingleMovieViewModel} from '../models';
import SingleMovie from '../View';

const navigation = {} as any;

const route = {
  params: {
    idMovie: 1,
  },
} as any;

const toggleMostView = jest.fn();

const mockUseSingleMovie: SingleMovieViewModel = () => ({
  error: false,
  loading: false,
  focused: true,
  styleRotate: {
    transform: [
      {
        rotate: '0deg',
      },
    ],
  },
  dataMovie: movies[0],
  stylesAnimation: {
    flex: 3.5,
  },
  toggleMostView,
  valueAnimated: {
    value: 'middle',
  },
});
describe('SingleMovie', () => {
  it('render component correctly', () => {
    const vote = makeVoteAverage(movies[0].vote_count, movies[0].vote_average);
    const {getByText, getByTestId, getAllByTestId} = render(
      <JestProviders>
        <SingleMovie
          navigation={navigation}
          route={route}
          useSingleMovie={mockUseSingleMovie}
          usePlaylistImpl={mockUseCasePlaylist}
        />
      </JestProviders>,
    );

    expect(getByTestId('gesture-element')).toBeTruthy();
    expect(getByTestId('arrow-rotate')).toBeTruthy();
    expect(getByText(movies[0].title)).toBeTruthy();
    expect(getByText(movies[0].overview)).toBeTruthy();
    expect(`${vote.toFixed(2)} ${movies[0].vote_count}`).toBeTruthy();
    expect(getAllByTestId('card-cast').length).toEqual(movies[0].cast?.length);
  });

  it('render component with loading status', () => {
    const mockUseSingleMovie: SingleMovieViewModel = () => ({
      error: false,
      loading: true,
      focused: true,
      styleRotate: {
        transform: [
          {
            rotate: '0deg',
          },
        ],
      },
      dataMovie: movies[0],
      stylesAnimation: {
        flex: 3.5,
      },
      toggleMostView,
      valueAnimated: {
        value: 'middle',
      },
    });
    const {getByTestId} = render(
      <JestProviders>
        <SingleMovie
          navigation={navigation}
          route={route}
          useSingleMovie={mockUseSingleMovie}
          usePlaylistImpl={mockUseCasePlaylist}
        />
      </JestProviders>,
    );

    expect(getByTestId('loading')).toBeTruthy();
  });

  it('handle toggleMostView for expanded information to movie and resume informations', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SingleMovie
          navigation={navigation}
          route={route}
          useSingleMovie={mockUseSingleMovie}
          usePlaylistImpl={mockUseCasePlaylist}
        />
      </JestProviders>,
    );

    const gestureElement = getByTestId('gesture-element');

    fireGestureHandler<PanGesture>(gestureElement, [
      {state: State.BEGAN, translationY: 0},
      {state: State.ACTIVE, translationY: 20},
      {translationY: 50},
      {translationY: 70},
      {state: State.END, translationY: 70},
    ]);

    expect(toggleMostView).toBeCalledWith(70);

    fireGestureHandler<PanGesture>(gestureElement, [
      {state: State.BEGAN, translationY: 70},
      {state: State.ACTIVE, translationY: 50},
      {translationY: 20},
      {translationY: 0},
      {state: State.END, translationY: 0},
    ]);

    expect(toggleMostView).toBeCalledWith(0);

    expect(toggleMostView).toBeCalledTimes(4);
  });
});
