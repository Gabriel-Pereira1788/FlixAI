import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {DataMovieCollection, PlaylistResults} from '@database';
import {Movie} from '@models';
import {Heart} from 'phosphor-react-native';

import {Box, modalRef} from '@components';

import {CollectionAddModal} from './components/CollectionAddModal';
import {CollectionRemoveModal} from './components/CollectionRemoveModal';

type Props = {
  movie: Movie;
  currentMovieCollection: DataMovieCollection | null;
  collectionsAvailable: PlaylistResults;
  refreshCollection: () => void;
};

export function SingleMovieCollectionHandler({
  movie,
  currentMovieCollection,
  collectionsAvailable,
  refreshCollection,
}: Props) {
  const belongsToCollection =
    currentMovieCollection && !!currentMovieCollection.dataMovie;

  function handleRefresh() {
    modalRef.current?.hide();
    setTimeout(() => {
      refreshCollection();
    }, 1500);
  }
  function openModal() {
    if (!belongsToCollection) {
      modalRef.current?.show(
        <CollectionAddModal
          movie={movie}
          onAdd={handleRefresh}
          collectionsAvailable={collectionsAvailable}
        />,
      );
    }

    if (belongsToCollection && currentMovieCollection.dataPlaylist) {
      modalRef.current?.show(
        <CollectionRemoveModal
          collectionsAvailable={collectionsAvailable}
          movie={movie}
          onRemove={handleRefresh}
          playlist={currentMovieCollection.dataPlaylist}
        />,
      );
    }
  }

  return (
    <Box
      position="absolute"
      top={20}
      right={20}
      alignItems="center"
      justifyContent="center"
      backgroundColor="alertError"
      testID="container-icon"
      marginRight="s"
      width={10}
      height={10}
      style={$boxStyle}>
      <TouchableOpacity onPress={openModal}>
        <Heart
          size={40}
          color="#fff"
          weight={belongsToCollection ? 'fill' : 'bold'}
        />
      </TouchableOpacity>
    </Box>
  );
}

const $boxStyle: ViewStyle = {
  backgroundColor: 'rgba(0,0,0,0.8',
};
