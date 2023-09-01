import React, {useState} from 'react';
import {FlatList} from 'react-native';

import {Collection, PlaylistResults} from '@database';

import {
  Box,
  Button,
  EmptyMessage,
  RenderIF,
  SelectItem,
  Text,
} from '@components';

type Props = {
  title: string;
  onConfirm: (collectionSelected: Collection | null) => void;
  collectionList: PlaylistResults | Collection[];
};

export function CollectionModalContent({
  title,
  collectionList,
  onConfirm,
}: Props) {
  const [collectionSelected, setCollectionSelected] =
    useState<Collection | null>(null);

  const haveCollections = collectionList && collectionList.length > 0;

  function handleChange(id: string, isSelected: boolean) {
    const findedPlaylist = collectionList.find(data => data.id === id);
    if (findedPlaylist && isSelected) {
      setCollectionSelected(findedPlaylist);
    }
  }

  function handleConfirm() {
    if (collectionSelected) {
      onConfirm(collectionSelected);
    }
  }
  return (
    <Box
      position="absolute"
      borderTopStartRadius="xl"
      borderTopEndRadius="xl"
      bottom={0}
      alignItems="flex-start"
      justifyContent="flex-start"
      width={'100%'}
      height={'80%'}
      backgroundColor="background"
      gap={'l'}
      padding={'m'}
      borderRadius={'m'}>
      <RenderIF condition={!haveCollections}>
        <EmptyMessage message="Sem bibliotecas criadas" />
      </RenderIF>

      <RenderIF condition={haveCollections}>
        <Text paddingTop="l" color="green" fontWeight={'500'} fontSize={40}>
          {title}
        </Text>
        <Button onPress={handleConfirm}>Confirmar</Button>
        <Text color="gray" fontWeight={'500'} fontSize={20}>
          Remover de:
        </Text>
        <FlatList
          data={collectionList}
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item}) => (
            <SelectItem
              onSelect={isSelected => {
                handleChange(item.id, isSelected);
              }}
              label={(item && item.title) ?? ''}
            />
          )}
        />
      </RenderIF>
    </Box>
  );
}
