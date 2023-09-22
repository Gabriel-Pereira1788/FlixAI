import React from 'react';

import {render} from '@testing-library/react-native';

import {TMBD_BACKDROP_URL} from '../../../../helpers/constants/tmdb';
import {makeVoteAverage} from '../../../../helpers/utils/makeVoteAverage';
import {Movie} from '../../../../models/Movie';
import JestProviders from '../../../../providers/JestProviders';
import {Text} from '../../../Atoms/Text/View';
import CardMovie from '../View';

const dataMovie: Movie = {
  backdrop_path: 'www.example.com',
  id: 3,
  original_title: 'Teste Movie 3',
  overview: 'teste overview',
  poster_path: 'www.example.com',
  release_date: '31/13',
  title: 'Teste 3',
  name: 'teste 3',
  vote_average: 7.5,
  vote_count: 100,
  imdb_id: '...',
  genre_ids: [1, 2, 3],
};
describe('CardMovie', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <CardMovie {...dataMovie}>
          <Text>teste</Text>
        </CardMovie>
      </JestProviders>,
    );

    const imageElement = getByTestId('image-card');

    const vote = makeVoteAverage(dataMovie.vote_count, dataMovie.vote_average);
    expect(imageElement).toBeTruthy();
    expect(getByText(dataMovie.title)).toBeTruthy();
    expect(getByText(`${dataMovie.overview.slice(0, 50)}...`)).toBeTruthy();
    expect(getByText('teste')).toBeTruthy();
    expect(getByText(vote.toFixed(1))).toBeTruthy();
  });
  it('image render correctly path ', () => {
    const {getByTestId} = render(
      <JestProviders>
        <CardMovie {...dataMovie} />
      </JestProviders>,
    );

    const imageElement = getByTestId('image-card');

    expect(imageElement.props.source.uri).toEqual(
      `${TMBD_BACKDROP_URL}${dataMovie.backdrop_path}`,
    );
  });
  it('set container style', () => {
    const style = {
      backgroundColor: '#ddd',
      width: '100%',
    };
    const {getByTestId} = render(
      <JestProviders>
        <CardMovie {...dataMovie} containerStyle={style} />
      </JestProviders>,
    );

    const container = getByTestId('container');
    console.log(container.props.style);
    expect(container.props.style).toEqual(style);
  });
  it('set stack style', () => {
    const style = {
      backgroundColor: '#f49191',
      width: '100%',
      justifyContent: 'center',
    };
    const {getByTestId} = render(
      <JestProviders>
        <CardMovie {...dataMovie} stackStyle={style} />
      </JestProviders>,
    );

    const container = getByTestId('container-stack');
    expect(container.props.style.width).toEqual('100%');
    expect(container.props.style.backgroundColor).toEqual('#f49191');
    expect(container.props.style.justifyContent).toEqual('center');
  });
});
