import {Movie} from '@models';

import {useCreateLibraryViewModel} from './CreateLibrary.viewModel';

export type CreateLibraryViewModel = ReturnType<
  typeof useCreateLibraryViewModel
>;

export interface CreateLibraryProps {
  moviesListToAdd: Movie[];
  viewModel: CreateLibraryViewModel;
}
