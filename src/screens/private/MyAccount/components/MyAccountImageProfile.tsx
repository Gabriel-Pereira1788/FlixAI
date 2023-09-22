import React from 'react';
import {TouchableOpacity} from 'react-native';

import {UserCircle} from 'phosphor-react-native';

import {Image, RenderIF} from '@components';

type Props = {
  photoURL?: string;
  pickImage: () => Promise<void>;
};

export function MyAccountImageProfile({photoURL, pickImage}: Props) {
  return (
    <TouchableOpacity onPress={pickImage}>
      <RenderIF
        condition={!!photoURL}
        AlternativeComponent={<UserCircle size={100} color="#ddd" />}>
        <Image
          source={{uri: photoURL}}
          width={100}
          height={100}
          style={{
            borderRadius: 200,
          }}
        />
      </RenderIF>
    </TouchableOpacity>
  );
}
