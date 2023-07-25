import {HookProps} from './model';
import {useObject, Playlist} from '@database';
import {useFocusedScreen} from '@hooks';
import React from 'react';

export const useListMovies = ({idPlaylist}: HookProps) => {
  const library = useObject(Playlist, idPlaylist!);

  const {focused} = useFocusedScreen();

  const [searchText, setSearchText] = React.useState('');

  const displayMovies = React.useMemo(() => {
    let listMovies = library ? library.movies : [];

    if (searchText.trim() !== '' && listMovies.length > 0) {
      listMovies = listMovies.filter(movie => {
        const normalizedSearchText = searchText.toLowerCase();
        const normalizedMovieTitle = movie.title.toLowerCase();

        return normalizedMovieTitle.startsWith(normalizedSearchText);
      });
    }

    return library && focused ? listMovies : [];
  }, [library, focused, searchText]);

  function handleOnSearch(value: string) {
    setSearchText(value);
  }

  return {
    title: library ? library.title : '',
    moviesList: displayMovies,
    library,
    handleOnSearch,
  };
};
