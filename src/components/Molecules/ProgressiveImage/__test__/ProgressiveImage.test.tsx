import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {ProgressiveImage} from '../View';

const pathUrl = 'www.example.com';
const thumbnail = 'www.example1.com';
describe('ProgressiveImage', () => {
  it('render component correctly', () => {
    const {getAllByTestId} = render(
      <JestProviders>
        <ProgressiveImage
          testID="progressiveImage"
          source={{uri: pathUrl}}
          thumbnailSource={thumbnail}
        />
      </JestProviders>,
    );

    const images = getAllByTestId('progressiveImage');

    expect(images[0].props.source.uri).toEqual(thumbnail);

    expect(images[1].props.source.uri).toEqual(pathUrl);
  });
});
