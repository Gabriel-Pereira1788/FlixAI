import {Collection} from '@database';
import {Movie} from '@models';

import {useCollection} from './useCollection';

type Props = {
  onSuccess?: () => void;
  movie: Movie;
};

export function useCollectionRemove({onSuccess, movie}: Props) {
  const collectionQuery = useCollection();

  function removeToCollection(collectionSelected: Collection | null) {
    if (collectionSelected) {
      const filteredMovies = collectionSelected.movies.filter(
        dataMovie => dataMovie.id !== movie.id,
      );
      collectionQuery.edit({
        _id: collectionSelected._id,
        title: collectionSelected.title,
        movies: filteredMovies,
      });

      if (onSuccess) {
        onSuccess();
      }
    }
  }

  return {
    removeToCollection,
  };
}
