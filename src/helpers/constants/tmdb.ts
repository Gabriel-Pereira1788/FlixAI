import {Genre} from '../../models/Movie';

export const TMDB_KEY = 'caafc650f33fc68a6f16bf46a5c6ee13';

export const TMBD_BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
export const TMBD_BACKDROP_PREVIEW = 'https://image.tmdb.org/t/p/w300';

export const TMDB_GENRES: Genre[] = [
  {id: 28, name: 'Ação', identify: 'action'},
  {id: 35, name: 'Comédia', identify: 'comedy'},
  {id: 99, name: 'Documentário', identify: 'documentaries'},
  {id: 27, name: 'Terror', identify: 'horror'},
  {id: 10749, name: 'Romance', identify: 'romance'},
  {id: 12, name: 'Aventura'},
  {id: 16, name: 'Animação'},
  {id: 80, name: 'Crime'},
  {id: 18, name: 'Drama'},
  {id: 10751, name: 'Família'},
  {id: 14, name: 'Fantasia'},
  {id: 36, name: 'História'},
  {id: 10402, name: 'Música'},
  {id: 9648, name: 'Mistério'},
  {id: 878, name: 'Ficção Científica'},
  {id: 10770, name: 'Filme para TV'},
  {id: 53, name: 'Suspense'},
  {id: 10752, name: 'Guerra'},
  {id: 37, name: 'Faroeste'},
];
