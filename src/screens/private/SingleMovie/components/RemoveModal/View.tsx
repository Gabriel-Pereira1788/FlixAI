import React from 'react';
import * as S from 'native-base';
import {RemoveModalViewModel} from './model';
import {useRemoveModal} from './useRemoveModal';
import {Movie} from '../../../../../models/Movie';
import {Playlist} from '../../../../../repositories/database/schemas/PlaylistSchema';
import {Button} from '../../../../../components/Atoms';

interface RemoveModalProps {
  movie: Movie;
  playlist: Playlist[];
  useRemoveModalImpl?: RemoveModalViewModel;
}

export default function RemoveModal({
  movie,
  playlist,
  useRemoveModalImpl = useRemoveModal,
}: RemoveModalProps) {
  const {onRemove, handleChange} = useRemoveModalImpl({movie, playlist});

  return (
    <S.VStack
      alignItems="center"
      justifyContent="center"
      w={'80%'}
      backgroundColor="background.main"
      space={5}
      padding={6}
      borderRadius={10}>
      <S.Text color="#ddd" fontWeight={500} fontSize="xl">
        Remover de:
      </S.Text>

      <S.Select
        testID="select"
        onValueChange={handleChange}
        p={3}
        placeholder="Adicionar a playlist..."
        w="100%"
        color="#ddd"
        borderColor="#3b3838"
        borderRadius={10}>
        {playlist &&
          playlist.length > 0 &&
          playlist.map(data => (
            <S.Select.Item
              testID="select-item"
              key={data.id}
              color="#000"
              label={data && data.title ? data.title : ''}
              value={data && data.id ? data.id : ''}
            />
          ))}
      </S.Select>
      <Button onPress={onRemove}>Confirmar</Button>
    </S.VStack>
  );
}
