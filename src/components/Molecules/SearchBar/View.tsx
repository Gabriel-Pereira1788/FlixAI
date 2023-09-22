import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {MagnifyingGlass} from 'phosphor-react-native';

import {DSInputProps, Input} from '@components';
interface SearchBarProps extends Omit<DSInputProps, 'variant'> {
  onSearch?: (value: string) => void;
  Icon?: React.FC;
}

export function SearchBar({onSearch, Icon, ...rest}: SearchBarProps) {
  const [value, setValue] = React.useState('');

  function overrideOnSearch() {
    if (onSearch) {
      onSearch(value);
    }
  }
  return (
    <Input
      maxHeight={50}
      placeholder="Pesquise aqui..."
      placeholderTextColor="#ddd"
      variant="search"
      rightElement={
        <TouchableOpacity testID="buttonSearch" onPress={overrideOnSearch}>
          <View>
            {Icon ? (
              <Icon />
            ) : (
              <View testID="iconglass">
                <MagnifyingGlass size={25} color="#ddd" weight="bold" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      }
      onChangeText={text => setValue(text)}
      value={value}
      {...rest}
    />
  );
}
