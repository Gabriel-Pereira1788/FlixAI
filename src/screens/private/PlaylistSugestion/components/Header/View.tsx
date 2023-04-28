import React from 'react';
import * as S from 'native-base';
import {TouchableOpacity} from 'react-native';
import {MagnifyingGlass, PaperPlaneRight} from 'phosphor-react-native';
import SearchBar from '../../../../../components/SearchBar/View';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from 'react-native-reanimated';
import {useVisible} from '../../../../../helpers/hooks/useVisible';
import RenderIF from '../../../../../components/RenderIF/View';

interface HeaderProps {
  onSearch: (value: string) => Promise<void>;
}

export default function Header({onSearch}: HeaderProps) {
  const {visible, toggleVisible} = useVisible();

  function handleOnSearch(value: string) {
    onSearch(value);
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
              onSearch={handleOnSearch}
              Icon={() => <PaperPlaneRight color="#ddd" />}
            />
          </Animated.View>
        </S.VStack>
      </RenderIF>
      <S.HStack w="100%" alignItems="center" justifyContent="space-between">
        <Animated.View
          style={{width: '70%'}}
          entering={FadeInLeft.delay(150).duration(200)}>
          <S.Text fontWeight={500} fontSize="2xl" color="#ddd">
            Olá Gabriel, O que precisa para hoje ?
          </S.Text>
        </Animated.View>

        <TouchableOpacity onPress={toggleVisible}>
          <S.Box mr={5}>
            <MagnifyingGlass size={25} color="#ddd" weight="bold" />
          </S.Box>
        </TouchableOpacity>
      </S.HStack>
    </S.VStack>
  );
}
