import React from 'react';

import {PlaylistResults, useCollectionAdd} from '@database';
import {Movie} from '@models';
import {useToastActions} from '@store';

import {CollectionModalContent} from './CollectionModalContent';

interface AddModalProps {
  movie: Movie;
  collectionsAvailable: PlaylistResults;
  onAdd: () => void;
}

export function CollectionAddModal({
  movie,
  collectionsAvailable,
  onAdd,
}: AddModalProps) {
  const {addToCollection} = useCollectionAdd({
    movie,
    onSuccess: () => {
      onAdd();
      toast.success('Adicionado com sucesso!');
    },
  });
  const toast = useToastActions();

  return (
    <CollectionModalContent
      collectionList={collectionsAvailable}
      onConfirm={addToCollection}
      title={movie && movie.title ? movie.title : ''}
    />
  );
}
