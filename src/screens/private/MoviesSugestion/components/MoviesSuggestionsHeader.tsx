import React from 'react';

import {Box, SearchHeader} from '@components';

type Props = {
  title: string;
  listenEventSearch: (value: string) => Promise<void>;
};

export function MoviesSuggestionsHeader({title, listenEventSearch}: Props) {
  return (
    <Box paddingHorizontal={'xl'} marginVertical={'xl'}>
      <SearchHeader listenEventSearch={listenEventSearch} title={title} />
    </Box>
  );
}
