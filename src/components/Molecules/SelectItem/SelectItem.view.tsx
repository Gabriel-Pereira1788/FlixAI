import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {Check} from 'phosphor-react-native';

import {Text, Box, RenderIF} from '../../Atoms';

type SelectItemProps = {
  label: string;
  disabled?: boolean;
  onSelect: (isSelected: boolean) => void;
};

export function SelectItem({
  label,
  onSelect,
  disabled = false,
}: SelectItemProps) {
  const [isSelected, setIsSelected] = useState(false);

  function overrideOnSelect() {
    setIsSelected(!isSelected);
    onSelect(!isSelected);
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{width: '100%'}}
      onPress={overrideOnSelect}>
      <Box
        flexDirection="row"
        opacity={disabled ? 0.5 : 1}
        padding="ms"
        borderRadius="s"
        backgroundColor="primary"
        width="100%"
        alignItems="center"
        justifyContent="space-between">
        <Box flex={1}>
          <Text textAlign="center" color="white" fontWeight="500" fontSize={15}>
            {label}
          </Text>
        </Box>
        <RenderIF condition={!!isSelected}>
          <Box
            borderRadius="full"
            testID="selected"
            zIndex={20}
            p={'s'}
            backgroundColor="orange">
            <Check size={10} color="#fff" />
          </Box>
        </RenderIF>
      </Box>
    </TouchableOpacity>
  );
}
