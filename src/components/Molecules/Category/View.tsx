import React from 'react';

import {IBoxProps, ITextProps, Box, Text} from '@components/atoms';

interface CategorieProps extends IBoxProps {
  text: string;
  identify?: string;
  currentCategory?: string;
  textProps?: ITextProps;
}

export function Category({
  text,
  currentCategory,
  identify,
  textProps,
  ...rest
}: CategorieProps) {
  return (
    <Box
      testID="box"
      marginHorizontal={'s'}
      shadowOffset={{width: 2, height: 2}}
      shadowColor="black"
      paddingHorizontal={'s'}
      paddingVertical={'xs'}
      backgroundColor={currentCategory === identify ? 'activeColor' : 'primary'}
      borderRadius="m"
      {...rest}>
      <Text
        variant="category"
        fontWeight={'500'}
        color={currentCategory === identify ? 'primary' : 'activeColor'}
        {...textProps}>
        {text}
      </Text>
    </Box>
  );
}
