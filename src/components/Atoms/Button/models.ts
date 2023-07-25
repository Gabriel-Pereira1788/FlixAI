import {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
} from '@shopify/restyle';
import {Theme} from '@styles';

export type ButtonDSProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;
