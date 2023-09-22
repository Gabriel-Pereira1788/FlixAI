import {Movie} from '@models';

export class MoviesAdapter {
  constructor() {}

  toOnlyMovie(movies: (Movie | null)[]) {
    return movies.reduce<Movie[]>((acc, currentData) => {
      if (currentData != null) {
        acc.push(currentData);
      }

      return acc;
    }, []);
  }
}
