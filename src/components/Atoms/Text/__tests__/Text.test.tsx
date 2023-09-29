import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Text} from '../View'; // Import your Text component from the correct location

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(
      <JestProviders>
        <Text>Hello, World!</Text>
      </JestProviders>,
    );

    // You can add more assertions here to check the rendered output.
    // For example, checking the font size, fontFamily, and other styles.
    const textElement = getByText('Hello, World!');
    const fontSize = textElement.props.style[1][0].fontSize;
    const fontFamily = textElement.props.style[1][1].fontFamily;
    expect(fontSize).toEqual(16);
    expect(fontFamily).toEqual('Satoshi-Regular');
  });

  it('renders correctly with custom props', () => {
    const {getByText} = render(
      <JestProviders>
        <Text preset="headingLarge" bold italic>
          Custom Text
        </Text>
      </JestProviders>,
    );

    // Add assertions to check if the component renders with the correct props.
    const textElement = getByText('Custom Text');
    const fontSize = textElement.props.style[1][0].fontSize;
    const fontFamily = textElement.props.style[1][1].fontFamily;

    expect(fontSize).toEqual(32);
    expect(fontFamily).toEqual('Satoshi-BoldItalic');
  });

  // Add more test cases as needed to cover different scenarios.
});
