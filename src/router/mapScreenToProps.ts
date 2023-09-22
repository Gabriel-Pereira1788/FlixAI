import {AppTabParamList} from './AppTabNavigator';

type MappedScreenProps = Record<
  keyof AppTabParamList,
  {
    label: string;
    iconName?: 'magnifingGlass' | 'queue' | 'popcorn' | 'user';
  }
>;

export const mapScreenToProps: MappedScreenProps = {
  SuggestionsScreen: {
    label: 'Inicio',
    iconName: 'magnifingGlass',
  },
  MoviesScreen: {
    label: 'Filmes',
    iconName: 'popcorn',
  },
  MyAccountScreen: {
    label: 'Minha conta',
    iconName: 'user',
  },
  UserLibraryScreen: {
    label: 'Galeria de Filmes',
    iconName: 'queue',
  },
};
