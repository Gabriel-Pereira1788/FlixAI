declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
type GenreIdentify =
  | 'all'
  | 'popular'
  | 'top'
  | 'action'
  | 'comedy'
  | 'horror'
  | 'romance'
  | 'documentaries';

interface Filter {
  text?: string;
  category?: GenreIdentify;
}
