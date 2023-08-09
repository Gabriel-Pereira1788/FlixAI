import React from 'react';
import {TouchableOpacity} from 'react-native';

import {MagnifyingGlass, PaperPlaneRight} from 'phosphor-react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from 'react-native-reanimated';

import {
  RenderIF,
  Box,
  Text,
  ITextProps,
  DSInputProps,
  SearchBar,
} from '@components';
import {useVisible} from '@hooks';

interface HeaderProps {
  title: string;
  listenEventSearch?: (value: string) => Promise<void> | void;
  titleProps?: ITextProps;
  RightComponent?: JSX.Element;
  inputProps?: DSInputProps;
}

const Icon: React.FC = () => <PaperPlaneRight color="#ddd" />;

export function SearchHeader({
  listenEventSearch,
  title,
  RightComponent,
  titleProps,
  inputProps,
}: HeaderProps) {
  const {visible, toggleVisible} = useVisible();

  function handleOnSearch(value: string) {
    if (listenEventSearch) {
      listenEventSearch(value)!;
    }
    toggleVisible();
  }

  return (
    <Box
      position="relative"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap="s"
      marginTop="m">
      <RenderIF condition={visible}>
        <Box width="100%" bottom={0}>
          <Animated.View
            style={{width: '100%'}}
            entering={FadeInUp.delay(500).duration(150)}
            exiting={FadeInDown.delay(500).duration(150)}>
            <SearchBar
              testID="searchBarcomponent"
              autoFocus={true}
              onSearch={listenEventSearch ? handleOnSearch : undefined}
              onBlur={() => {
                toggleVisible();
              }}
              Icon={Icon}
              {...inputProps}
            />
          </Animated.View>
        </Box>
      </RenderIF>
      <Box
        flexDirection="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between">
        <Animated.View
          key={title}
          style={{width: '85%'}}
          entering={FadeInLeft.delay(150).duration(200)}>
          <Text variant="header" {...titleProps}>
            {title}
          </Text>
        </Animated.View>
        <Box
          flexDirection="row"
          gap="s"
          alignItems="center"
          justifyContent="center">
          <TouchableOpacity testID="buttonVisible" onPress={toggleVisible}>
            <Box>
              <MagnifyingGlass size={25} color="#ddd" weight="bold" />
            </Box>
          </TouchableOpacity>
          <RenderIF condition={!!RightComponent}>{RightComponent}</RenderIF>
        </Box>
      </Box>
    </Box>
  );
}
