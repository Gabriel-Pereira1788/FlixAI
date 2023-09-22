import React from 'react';

import {TMBD_BACKDROP_PREVIEW, TMBD_BACKDROP_URL} from '@constants';
import {render} from '@testing-library/react-native';

import JestProviders from '../../../../../providers/JestProviders';
import {SingleMoviePoster} from '../SingleMoviePoster';

const imagePath = 'www.example.com';
describe('SingleMoviePoster', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <SingleMoviePoster imagePath={imagePath} />
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
