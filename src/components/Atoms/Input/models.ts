import {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
} from '@shopify/restyle';
import {Theme} from '@styles';

export type InputDsProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;
