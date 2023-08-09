import React from 'react';

import {render} from '@testing-library/react-native';

import {dataCast} from '../../../../../../../mocks/cast';
import {TMBD_BACKDROP_URL} from '../../../../../../helpers/constants/tmdb';
import {TMBD_BACKDROP_PREVIEW} from '../../../../../../helpers/constants/tmdb';
import {Cast} from '../../../../../../models/Cast';
import JestProviders from '../../../../../../providers/JestProviders';
import CardCast from '../View';

describe('CardCast', () => {
  it('render component correctly', () => {
    const {getAllByTestId, getByText} = render(
      <JestProviders>
        <CardCast {...dataCast[0]} />
      </JestProviders>,
    );
    const images = getAllByTestId('image-card');
    console.log(images[0].props);
    expect(images.length > 0).toBeTruthy();
    expect(images[0].props.source.uri).toEqual(
      `${TMBD_BACKDROP_PREVIEW}${dataCast[0].profile_path}`,
    );
    expect(images[1].props.source.uri).toEqual(
      `${TMBD_BACKDROP_URL}${dataCast[0].profile_path}`,
    );
    expect(getByText(dataCast[0].name)).toBeTruthy();
  });

  it('render without profile path', () => {
    const dataCast: Cast = {
      profile_path: '',
      name: 'John doe',
    };
    const {queryAllByTestId} = render(
      <JestProviders>
        <CardCast {...dataCast} />
      </JestProviders>,
    );

    expect(queryAllByTestId('image-card').length === 0).toBeTruthy();
  });
});
