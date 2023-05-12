import React from 'react';
import * as S from 'native-base';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import Button from '../../../components/Button/View';
import {NavigationProps} from '../../../router/navigation';
import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';
import RenderIF from '../../../components/RenderIF/View';

export default function Welcome({navigation}: NavigationProps<'Welcome'>) {
  const {focused} = useFocusedScreen();
  return (
    <S.VStack flex={1} width="100%" backgroundColor="background.main">
      <RenderIF condition={focused}>
        <S.VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          space={10}>
          <Animated.View
            style={{width: '85%'}}
            entering={FadeInLeft.delay(150).duration(200)}>
            <S.Text color="#ddd" fontWeight={500} fontSize="3xl">
              Seja bem vindo ao
              <S.Text color="orange.500" fontWeight={500} fontSize="3xl">
                {' '}
                Flixie
              </S.Text>
            </S.Text>
          </Animated.View>
          <Animated.View
            style={{width: '85%'}}
            entering={FadeInLeft.delay(300).duration(200)}>
            <S.Text color="#ddd" fontWeight={500} fontSize="2xl">
              Flixie é uma plataforma que utiliza de inteligencia artificial
              para facilitar a pesquisa de filmes criando playlists customizadas
              baseado na pesquisa do usuario.
            </S.Text>
          </Animated.View>

          <Animated.View
            style={{width: '85%'}}
            entering={FadeInLeft.delay(600).duration(200)}>
            <Button onPress={() => navigation.navigate('SignIn')}>
              Continuar
            </Button>
          </Animated.View>
        </S.VStack>
      </RenderIF>
    </S.VStack>
  );
}
