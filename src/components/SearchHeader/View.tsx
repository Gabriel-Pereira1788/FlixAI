import React from 'react';
import * as S from 'native-base';
import {TouchableOpacity} from 'react-native';
import {MagnifyingGlass, PaperPlaneRight} from 'phosphor-react-native';

import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from 'react-native-reanimated';
import {useVisible} from '../../helpers/hooks/useVisible';
import RenderIF from '../RenderIF/View';
import SearchBar from '../SearchBar/View';

interface HeaderProps {
  title: string;
  onSearch?: (value: string) => Promise<void> | void;
  titleProps?: S.ITextProps;
  RightComponent?: JSX.Element;
  inputProps?: S.IInputProps;
}

export default function SearchHeader({
  onSearch,
  title,
  RightComponent,
  titleProps,
  inputProps,
}: HeaderProps) {
  const {visible, toggleVisible} = useVisible();

  function handleOnSearch(value: string) {
    if (onSearch) {
      onSearch(value)!;
    }
    toggleVisible();
  }

  return (
    <S.VStack
      position="relative"
      w="100%"
      alignItems="center"
      justifyContent="center"
      space={4}>
      <RenderIF condition={visible}>
        <S.VStack w="100%" bottom={0}>
          <Animated.View
            style={{width: '100%'}}
            entering={FadeInUp.delay(500).duration(150)}
            exiting={FadeInDown.delay(500).duration(150)}>
            <SearchBar
              autoFocus={true}
              onSearch={onSearch ? handleOnSearch : undefined}
              onBlur={() => {
                toggleVisible();
              }}
              Icon={() => <PaperPlaneRight color="#ddd" />}
              {...inputProps}
            />
          </Animated.View>
        </S.VStack>
      </RenderIF>
      <S.HStack w="100%" alignItems="center" justifyContent="space-between">
        <Animated.View
          key={title}
          style={{width: '85%'}}
          entering={FadeInLeft.delay(150).duration(200)}>
          <S.Text fontWeight={500} fontSize="2xl" color="#ddd" {...titleProps}>
            {title}
          </S.Text>
        </Animated.View>
        <S.HStack space={3} alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={toggleVisible}>
            <S.Box>
              <MagnifyingGlass size={25} color="#ddd" weight="bold" />
            </S.Box>
          </TouchableOpacity>
          <RenderIF condition={!!RightComponent}>{RightComponent}</RenderIF>
        </S.HStack>
      </S.HStack>
    </S.VStack>
  );
}
