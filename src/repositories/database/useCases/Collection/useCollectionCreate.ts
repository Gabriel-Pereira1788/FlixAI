import {Movie} from '@models';

import {useCollection} from './useCollection';

type Props = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export function useCollectionCreate({onSuccess, onError}: Props) {
  const {create} = useCollection();
  async function createNewCollection(
    titleLibrary: string,
    selectedMovies: Movie[],
  ) {
    try {
      if (titleLibrary.trim().length === 0) {
        throw new Error('Por favor insira um titulo para continuar.');
      }
      await create({
        title: titleLibrary,
        movies: selectedMovies,
      });

      onSuccess && onSuccess();
    } catch (error) {
      onError &&
        onError(
          error
            ? error.message ?? ''
            : 'Algo deu errado tente novamente mais tarde',
        );
    }
  }

  return {
    createNewCollection,
  };
}
