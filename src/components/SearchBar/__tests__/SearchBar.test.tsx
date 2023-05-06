import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import JestProviders from '../../../providers/JestProviders';
import SearchBar from '../View';
import {Box} from 'native-base';
import {PaperPlaneRight} from 'phosphor-react-native';

describe('SearchBar', () => {
  it('render component correctly', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SearchBar testID="searchBar" />
      </JestProviders>,
    );

    expect(getByTestId('iconglass')).toBeTruthy();

    expect(getByTestId('searchBar')).toBeTruthy();
  });

  it('change value search', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SearchBar testID="searchBar" />
      </JestProviders>,
    );
    const input = getByTestId('searchBar');
    fireEvent.changeText(input, 'value');

    expect(input.props.value).toEqual('value');
  });

  it('render custom  icon', () => {
    const {getByTestId} = render(
      <JestProviders>
        <SearchBar
          testID="searchBar"
          Icon={() => (
            <Box testID="customIcon">
              <PaperPlaneRight size={20} />
            </Box>
          )}
        />
      </JestProviders>,
    );
    expect(getByTestId('customIcon')).toBeDefined();
  });

  it('call funciton onSearch correctly', () => {
    const onSearchMock = jest.fn();
    const {getByTestId} = render(
      <JestProviders>
        <SearchBar testID="searchBar" onSearch={onSearchMock} />
      </JestProviders>,
    );
    const input = getByTestId('searchBar');
    const buttonSearch = getByTestId('buttonSearch');
    fireEvent.changeText(input, 'value');
    fireEvent.press(buttonSearch);

    expect(onSearchMock).toHaveBeenCalledWith('value');
  });
});
