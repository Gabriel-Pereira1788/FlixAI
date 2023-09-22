import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';

import JestProviders from '../../../../../providers/JestProviders';
import {ListMoviesHeader} from '../ListMoviesHeader';

jest.useFakeTimers();

const handleSearchMock = jest.fn();
const openModalMock = jest.fn();

describe('ListMoviesHeader', () => {
  it('render component correctly', () => {
    const {getByText, getByTestId} = render(
      <JestProviders>
        <ListMoviesHeader
          handleOnSearch={handleSearchMock}
          openModal={openModalMock}
          title="John doe"
        />
      </JestProviders>,
    );

    const trashIcon = getByTestId('trash-icon');
    const titleComponent = getByText('John doe');
    expect(titleComponent).toBeTruthy();
    expect(trashIcon).toBeTruthy();
  });

  it('open modal in press trash-icon', () => {
    const {getByTestId} = render(
      <JestProviders>
        <ListMoviesHeader
          handleOnSearch={handleSearchMock}
          openModal={openModalMock}
          title="John doe"
        />
      </JestProviders>,
    );

    const trashIcon = getByTestId('trash-icon');
    fireEvent.press(trashIcon);

    expect(openModalMock).toBeCalled();
  });
});
