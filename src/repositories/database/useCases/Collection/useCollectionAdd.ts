import {Movie} from '@models';

import {Collection} from '../../schemas';

import {useCollection} from './useCollection';

type Props = {
  onSuccess?: () => void;
  movie: Movie;
};

export function useCollectionAdd({onSuccess, movie}: Props) {
  const collectionQuery = useCollection();

  function addToCollection(collectionSelected: Collection | null) {
    if (collectionSelected) {
      const collectionData = collectionQuery.filtered(
        `title = "${collectionSelected.title}"`,
      );

      const haveInDatabase =
        collectionData.length > 0
          ? collectionData[0]?.movies.find(
              dataMovie => dataMovie.id === movie?.id,
            )
          : null;

      if (!!haveInDatabase === false) {
        if (collectionData.length > 0 && collectionData[0].movies) {
          const newMovies = [...collectionData[0].movies, movie];

          collectionQuery.edit({
            _id: collectionData[0]._id,
            title: collectionData[0].title,
            movies: newMovies,
          });
        }
        if (onSuccess) {
          onSuccess();
        }
      }
    }
  }

  return {
    addToCollection,
  };
}
