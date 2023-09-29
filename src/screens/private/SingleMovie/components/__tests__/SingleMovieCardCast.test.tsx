import React from 'react';

import {TMBD_BACKDROP_PREVIEW, TMBD_BACKDROP_URL} from '@constants';
import {Cast} from '@models';
import {render} from '@testing-library/react-native';
import {logger} from '@utils';

import {dataCast} from '../../../../../../mocks/cast';
import JestProviders from '../../../../../providers/JestProviders';
import {SingleMovieCardCast} from '../SingleMovieCardCast';

describe('CardCast', () => {
  it('render component correctly', () => {
    const {getAllByTestId, getByText} = render(
      <JestProviders>
        <SingleMovieCardCast {...dataCast[0]} />
      </JestProviders>,
    );
    const images = getAllByTestId('image-card');
    logger.log(images[0].props);
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
        <SingleMovieCardCast {...dataCast} />
      </JestProviders>,
    );

    expect(queryAllByTestId('image-card').length === 0).toBeTruthy();
  });
});
