import React from 'react';
import {render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import RenderIF from '../View';
import {Text} from 'native-base';

describe('RenderIF', () => {
  it('render component with condition truthy', () => {
    const {getByText} = render(
      <JestProviders>
        <RenderIF condition={true}>
          <Text>teste</Text>
        </RenderIF>
      </JestProviders>,
    );

    expect(getByText('teste')).toBeTruthy();
  });

  it('render component with condition false', () => {
    const {queryByText} = render(
      <JestProviders>
        <RenderIF condition={false}>
          <Text>teste</Text>
        </RenderIF>
      </JestProviders>,
    );

    expect(queryByText('teste')).toBeNull();
  });

  it('render alternative component', () => {
    const {getByText} = render(
      <JestProviders>
        <RenderIF
          condition={false}
          AlternativeComponent={<Text>alternative</Text>}>
          <Text>teste</Text>
        </RenderIF>
      </JestProviders>,
    );

    expect(getByText('alternative')).toBeTruthy();
  });
});
