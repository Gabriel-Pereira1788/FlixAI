import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import {useVisible} from '../../../../helpers/hooks/useVisible';
import JestProviders from '../../../../providers/JestProviders';
import {Box} from '../../../Atoms/Box/View';
import {Text} from '../../../Atoms/Text/View';
import {SearchHeader} from '../View';

const useVisibleMock = useVisible as jest.Mock<ReturnType<typeof useVisible>>;
const toggleVisibleMock = jest.fn();
const setVisibleMock = jest.fn();
jest.mock('../../../../helpers/hooks/useVisible');

describe('SearchHeader', () => {
  beforeEach(() => {
    useVisibleMock.mockImplementation(() => ({
      visible: true,
      toggleVisible: toggleVisibleMock,
      setVisible: setVisibleMock,
    }));
  });
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <SearchHeader title="Titulo" />
      </JestProviders>,
    );

    expect(getByText('Titulo')).toBeTruthy();
    expect(getByTestId('searchBarcomponent')).toBeDefined();
  });

  it('render right component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <SearchHeader
          title="Titulo"
          RightComponent={
            <Box testID="box">
              <Text>teste</Text>
            </Box>
          }
        />
      </JestProviders>,
    );

    expect(getByText('Titulo')).toBeTruthy();
    expect(getByTestId('box')).toBeDefined();
  });

  it('set input  props', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SearchHeader
          title="Titulo"
          inputProps={{
            value: 'teste1',
          }}
        />
      </JestProviders>,
    );

    const inputElement = getByTestId('searchBarcomponent');

    expect(inputElement.props.value).toEqual('teste1');
  });

  it('call button visible correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SearchHeader
          title="Titulo"
          inputProps={{
            value: 'teste1',
          }}
        />
      </JestProviders>,
    );

    const buttonVisible = getByTestId('buttonVisible');
    fireEvent.press(buttonVisible);
    expect(toggleVisibleMock).toBeCalled();
  });

  it('render component without search bar', () => {
    useVisibleMock.mockImplementation(() => ({
      visible: false,
      toggleVisible: toggleVisibleMock,
      setVisible: setVisibleMock,
    }));
    const {queryByTestId} = render(
      <JestProviders>
        <SearchHeader title="Titulo" />
      </JestProviders>,
    );

    expect(queryByTestId('searchBarcomponent')).toBeNull();
  });
});
