import React, {useMemo} from 'react';

import {Collection, PlaylistResults, useCollectionRemove} from '@database';
import {Movie} from '@models';
import {useToastActions} from '@store';

import {CollectionModalContent} from './CollectionModalContent';

interface RemoveModalProps {
  collectionsAvailable: PlaylistResults;
  movie: Movie;
  playlist: Collection[];
  onRemove: () => void; //TODO:Implementar
}

export function CollectionRemoveModal({
  movie,
  collectionsAvailable,
  onRemove,
}: RemoveModalProps) {
  const {removeToCollection} = useCollectionRemove({
    movie,
    onSuccess: () => {
      onRemove();
      toast.success('Removido com sucesso!');
    },
  });

  const toast = useToastActions();

  const availabeToRemove = useMemo(() => {
    return collectionsAvailable.reduce((acc, collec) => {
      collec.movies.find(movieCollec => movieCollec.id === movie.id)
        ? acc.push(collec)
        : null;
      return acc;
    }, [] as Collection[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CollectionModalContent
      collectionList={availabeToRemove}
      onConfirm={removeToCollection}
      title={movie && movie.title ? movie.title : ''}
    />
  );
}
