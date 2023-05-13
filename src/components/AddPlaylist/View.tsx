import React from 'react';
import Button from '../Button/View';
import * as S from 'native-base';
import Input from '../Input/View';
import {Movie} from '../../models/Movie';
import CardMovie from '../CardMovie/View';
import {PlaylistDTO} from '../../models/Playlist';
import Alert from '../Alert/View';
import {AlertRef} from '../Alert/model';
import {modalRef} from '../Modal/View';

interface AddPlaylistProps {
  listData: Movie[];
  onCreate: (data: PlaylistDTO) => Promise<void> | void;
}

export default function AddPlaylist({listData, onCreate}: AddPlaylistProps) {
  const [titlePlaylist, settitlePlaylist] = React.useState('');
  const alertRef = React.useRef<AlertRef>(null);

  async function handleCreate() {
    if (titlePlaylist.trim() === '') {
      alertRef.current?.open({
        isOpen: true,
        text: 'Por favor preencha todos os campos.',
        status: 'warning',
      });
      return;
    }
    await onCreate({
      title: titlePlaylist,
      movies: listData,
    });

    modalRef.current?.hide();
  }
  return (
    <>
      <Alert
        ref={alertRef}
        containerStyle={{
          top: 5,
        }}
      />
      <S.VStack
        position="absolute"
        bottom={0}
        w="100%"
        h="80%"
        backgroundColor="rgba(15, 15, 22, 1)"
        alignItems="flex-start"
        justifyContent="flex-start"
        borderTopRadius={50}
        p={5}
        space={4}>
        <S.Text
          textAlign="left"
          color="#ffffffc3"
          fontWeight={600}
          fontSize="3xl">
          {titlePlaylist}
        </S.Text>
        <S.VStack
          w="100%"
          space={4}
          position="relative"
          mb={40}
          alignItems="center"
          justifyContent="center">
          {listData &&
            listData
              .slice(0, 3)
              .reverse()
              .map((data, index) => {
                return (
                  <CardMovie
                    key={data.id}
                    {...data}
                    containerStyle={{
                      flex: 1,
                      position: 'absolute',
                      zIndex: 1000,
                      left: Math.abs(index * 10),
                      top: Math.abs(index * 15),
                    }}
                  />
                );
              })}
        </S.VStack>
        <Input
          placeholder="Nome para a playlist..."
          value={titlePlaylist}
          onChangeText={value => settitlePlaylist(value)}
        />
        <Button onPress={handleCreate}>Confirmar</Button>
      </S.VStack>
    </>
  );
}
