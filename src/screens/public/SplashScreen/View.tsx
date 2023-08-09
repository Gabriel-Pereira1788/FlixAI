import React from 'react';

import {SharedLayout, Loading} from '@components';

import {useFocusedScreen} from '../../../helpers/hooks/useFocusedScreen';
import {NavigationProps} from '../../../router/navigation';
import {useUser} from '../../../store/server/useUser';

const INTERVALS = {
  loading_timeout: 1000,
  navigation_timeout: 15000,
};
//TODO:APAGAR
export default function SplashScreen({
  navigation,
}: NavigationProps<'SplashScreen'>) {
  const {focused} = useFocusedScreen();
  const {user} = useUser();

  const navigationTimeout = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!user) {
      navigationTimeout.current = setTimeout(() => {
        navigation.replace('SignIn');
      }, INTERVALS.navigation_timeout);
    }

    if (!focused) {
      clearInterval(navigationTimeout.current!);
    }
  }, [navigation, focused, user]);

  return (
    <SharedLayout
      containerStyle={{
        justifyContent: 'center',
      }}>
      <Loading typeLoading="IA" />
    </SharedLayout>
  );
}
