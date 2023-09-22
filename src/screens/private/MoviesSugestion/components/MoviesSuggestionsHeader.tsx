import React from 'react';

import {Box, SearchHeader} from '@components';
import {useAppSafeArea} from '@hooks';

type Props = {
  title: string;
  listenEventSearch: (value: string) => Promise<void>;
};

export function MoviesSuggestionsHeader({title, listenEventSearch}: Props) {
  const {top} = useAppSafeArea();
  return (
    <Box paddingHorizontal={'xl'} style={{marginTop: top}}>
      <SearchHeader listenEventSearch={listenEventSearch} title={title} />
    </Box>
  );
}
