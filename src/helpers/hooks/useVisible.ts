import React from 'react';

export function useVisible() {
  const [visible, setVisible] = React.useState(false);

  function toggleVisible() {
    setVisible(!visible);
  }

  return {visible, toggleVisible, setVisible};
}
