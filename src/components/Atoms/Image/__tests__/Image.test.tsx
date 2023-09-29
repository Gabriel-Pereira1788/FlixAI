import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Image} from '../View';

const urlExample = 'http://www.example.com/simple-image.png';
describe('Image', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <Image
          testID="image-render"
          source={{
            uri: urlExample,
          }}
        />
      </JestProviders>,
    );

    const imageComponent = getByTestId('image-render');
    expect(imageComponent.props.source.uri).toEqual(urlExample);
    expect(imageComponent).toBeTruthy();
  });
});
