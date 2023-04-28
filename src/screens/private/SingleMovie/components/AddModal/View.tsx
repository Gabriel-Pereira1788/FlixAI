import React from 'react';
import * as S from 'native-base';
import {Movie} from '../../../../../models/Movie';
import Button from '../../../../../components/Button/View';
import {useAddModal} from './useAddModal';

interface AddModalProps {
  movie: Movie;
}

export default function AddModal({movie}: AddModalProps) {
  const {dataPlaylist, handleChange, onAdd} = useAddModal({movie});
  return (
    <S.VStack
      alignItems="center"
      justifyContent="center"
      w={'80%'}
      backgroundColor="background.main"
      space={5}
      padding={6}
      borderRadius={10}>
      <S.Text color="green.200" fontWeight={500} fontSize="3xl">
        {movie && movie.title ? movie.title : ''}
      </S.Text>
      <S.Select
        onValueChange={handleChange}
        p={3}
        placeholder="Adicionar a playlist..."
        w="100%"
        color="#ddd"
        borderColor="#3b3838"
        borderRadius={10}>
        {dataPlaylist &&
          dataPlaylist.length > 0 &&
          dataPlaylist.map(data => (
            <S.Select.Item color="#000" label={data.title} value={data.title} />
          ))}
      </S.Select>
      <Button onPress={onAdd}>Confirmar</Button>
    </S.VStack>
  );
}
