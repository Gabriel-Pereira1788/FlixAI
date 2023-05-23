import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../../../../providers/JestProviders';
import Poster from '../View';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../../../../helpers/constants/tmdb';

const imagePath = 'www.example.com';
describe('Poster', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <Poster imagePath={imagePath} />
      </JestProviders>,
    );
    const posterImages = getAllByTestId('poster-image');

    expect(posterImages[0].props.source.uri).toEqual(
      `${TMBD_BACKDROP_PREVIEW}${imagePath}`,
    );
    expect(posterImages[1].props.source.uri).toEqual(
      `${TMBD_BACKDROP_URL}${imagePath}`,
    );
  });
});
