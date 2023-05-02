import React from 'react';
import * as S from 'native-base';
interface CategorieProps extends S.IBoxProps {
  text: string;
  identify?: string;
  currentCategory?: string;
  textProps?: S.ITextProps;
}

export default function Category({
  text,
  currentCategory,
  identify,
  textProps,
  ...rest
}: CategorieProps) {
  return (
    <S.Box
      mx={3}
      shadow={5}
      px={3}
      py={1}
      backgroundColor={
        currentCategory === identify ? '#ffffffef' : 'blueDark.primary'
      }
      borderRadius="2xl"
      {...rest}>
      <S.Text
        fontWeight={500}
        color={currentCategory === identify ? 'blueDark.primary' : '#ffffffc3'}
        fontSize="md"
        {...textProps}>
        {text}
      </S.Text>
    </S.Box>
  );
}
