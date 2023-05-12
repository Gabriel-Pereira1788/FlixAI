import React from 'react';
import {AlertRef} from '../../../components/Alert/model';
import {useMyAccount} from './useMyAccount';

export type HookProps = {
  alertRef: React.RefObject<AlertRef>;
};

export type MyAccountViewModel = (
  props: HookProps,
) => ReturnType<typeof useMyAccount>;
