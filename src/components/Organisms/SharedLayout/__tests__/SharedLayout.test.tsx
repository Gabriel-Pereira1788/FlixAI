import React from 'react';

import {render} from '@testing-library/react-native';

import JestProviders from '../../../../providers/JestProviders';
import {Text} from '../../../Atoms/Text/View';
import {SharedLayout} from '../View';

describe('SharedLayout', () => {
  it('render component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SharedLayout>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(getByText('teste')).toBeTruthy();
  });
  it('render header component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SharedLayout HeaderComponent={<Text>header</Text>}>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(getByText('header')).toBeTruthy();
  });

  it('render bottom component correctly', () => {
    const {getByText} = render(
      <JestProviders>
        <SharedLayout BottomComponent={<Text>bottom</Text>}>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(getByText('bottom')).toBeTruthy();
  });

  it('render component with loading', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SharedLayout isLoadingData={true}>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(getByTestId('loading')).toBeTruthy();
  });

  it('render component without loading', () => {
    const {queryByTestId} = render(
      <JestProviders>
        <SharedLayout isLoadingData={false}>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(queryByTestId('loading')).toBeNull();
  });

  it('render component with error', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SharedLayout isLoadingData={false} error={{message: 'have a error'}}>
          <Text>teste</Text>
        </SharedLayout>
      </JestProviders>,
    );
    expect(getByTestId('container-error')).toBeDefined();
  });
});
