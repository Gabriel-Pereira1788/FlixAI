import React from 'react';

import {useNavigation} from '@react-navigation/native';

export function useFocusedScreen() {
  const [focused, setFocused] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setFocused(true);
    });
    navigation.addListener('blur', () => {
      setFocused(false);
    });
  }, [navigation]);
  return {focused};
}
