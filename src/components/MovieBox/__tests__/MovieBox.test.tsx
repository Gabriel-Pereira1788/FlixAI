import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import MovieBox from '../View';
import {Movie} from '../../../models/Movie';
import {
  TMBD_BACKDROP_PREVIEW,
  TMBD_BACKDROP_URL,
} from '../../../helpers/constants/tmdb';
import {Text} from 'native-base';

const dataMovie: Movie = {
  backdrop_path: 'www.example.com',
  id: 1,
  original_title: 'Teste Movie 1',
  overview: 'teste overview',
  poster_path: 'www.example.com',
  release_date: '21/12',
  title: 'Teste1 1',
  name: 'teste1 1',
  vote_average: 7.5,
  vote_count: 100,
  imdb_id: '...',
  genre_ids: [1, 2, 3],
};

describe('MovieBox', () => {
  it('render component correctly', () => {
    const {getByText, getAllByTestId} = render(
      <JestProviders>
        <MovieBox dataMovie={dataMovie}>
          <Text>teste</Text>
        </MovieBox>
      </JestProviders>,
    );

    const image = getAllByTestId('image');
    expect(getByText(dataMovie.title)).toBeTruthy();
    expect(getByText('teste')).toBeTruthy();
    expect(image.length).toEqual(2);
  });

  it('render image', () => {
    const {getByText, getAllByTestId} = render(
      <JestProviders>
        <MovieBox dataMovie={dataMovie} />
      </JestProviders>,
    );

    const image = getAllByTestId('image');

    expect(getByText(dataMovie.title)).toBeTruthy();
    expect(image[0].props.source.uri).toEqual(
      `${TMBD_BACKDROP_PREVIEW}${dataMovie.backdrop_path}`,
    );
    expect(image[1].props.source.uri).toEqual(
      `${TMBD_BACKDROP_URL}${dataMovie.backdrop_path}`,
    );
  });
});
