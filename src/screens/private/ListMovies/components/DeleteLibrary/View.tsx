import React from 'react';
import {AlertRef, Alert, modalRef, Button} from '@components';
import {useRealm, Playlist} from '@database';
import * as S from 'native-base';

interface DeleteLibraryProps {
  library: (Playlist & Realm.Object<Playlist, never>) | null;
  goBack(): void;
  useRealmImpl?: () => Realm;
}

export default function DeleteLibrary({
  library,
  goBack,
  useRealmImpl = useRealm,
}: DeleteLibraryProps) {
  const realm = useRealmImpl();

  const alertRef = React.useRef<AlertRef>(null);

  function confirmDelete() {
    realm.write(() => {
      realm.delete(library);
      alertRef.current?.open({
        isOpen: true,
        text: 'Biblioteca apagada...',
        status: 'success',
      });

      goBack();
      modalRef.current?.hide();
    });
  }
  return (
    <>
      <Alert ref={alertRef} />
      <S.VStack
        alignItems="center"
        justifyContent="center"
        w={'80%'}
        backgroundColor="background.main"
        space={5}
        padding={6}
        borderRadius={10}>
        <S.Text color="green.200" fontWeight={500} fontSize="3xl">
          {library?.title ?? ''}
        </S.Text>
        <Button onPress={confirmDelete}>Confirmar</Button>
      </S.VStack>
    </>
  );
}
