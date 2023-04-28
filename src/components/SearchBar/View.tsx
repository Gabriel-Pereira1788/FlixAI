import React from 'react';
import * as S from 'native-base';
import {MagnifyingGlass} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native';

interface SearchBarProps extends S.IInputProps {
  onSearch: (value: string) => void;
  Icon?: React.FC;
}

export default function SearchBar({onSearch, Icon, ...rest}: SearchBarProps) {
  const [value, setValue] = React.useState('');

  function overrideOnSearch() {
    onSearch(value);
  }
  return (
    <S.Input
      placeholder="Pesquise aqui..."
      placeholderTextColor="#ddd"
      color="#fff"
      w="100%"
      p={3}
      borderRadius="lg"
      borderColor="#dddddd3d"
      focusOutlineColor=""
      rightElement={
        <TouchableOpacity onPress={overrideOnSearch}>
          <S.Box mr={5}>
            {Icon ? (
              <Icon />
            ) : (
              <MagnifyingGlass size={25} color="#ddd" weight="bold" />
            )}
          </S.Box>
        </TouchableOpacity>
      }
      borderWidth={1}
      {...rest}
      onChangeText={text => setValue(text)}
      value={value}
    />
  );
}
