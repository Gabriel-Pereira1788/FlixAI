import {ViewStyle} from 'react-native';

import {createTheme} from '@shopify/restyle';

import {AlertVariants} from './alert_variants';
import {ButtonVariants} from './button_variants';
import {CardVariants} from './card_variants';
import {palette} from './colors_variants';
import {ImageVariants} from './image_variants';
import {InputVariants} from './input_variants';
import {TextVariants} from './text_variants';

export const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -3,
  },
  shadowOpacity: 0.05,
  shadowRadius: 12,
};

const theme = createTheme({
  colors: {
    green: palette.greenMain,
    orange: palette.orangeMain,
    background: palette.backgroundMain,
    primary: palette.primary,
    activeColor: palette.active,
    primaryTextColor: palette.textColor.primary,
    secondaryTextColor: palette.textColor.secondary,
    thirdTextColor: palette.textColor.third,
    redTextColor: palette.textColor.red,
    grayTextColor: palette.textColor.gray,
    grayDarkTextColor: palette.textColor.grayDark,
    grayDarkTextColor2: palette.textColor.grayDark2,
    grayLightTextColor: palette.textColor.grayLight,
    borderMainColor: palette.borderColor.main,
    borderGray: palette.borderColor.gray,
    borderErrorColor: palette.borderColor.error,
    white: '#ffffff',
    black: '#000000',
    gray: '#dddddd',
    alertSucess: palette.alert.success,
    alertInfo: palette.alert.info,
    alertError: palette.alert.error,
    alertWarning: palette.alert.warning,
    transparent: palette.transparent,
    bottomTabTransparent: palette.bottomTabTranparent,
  },

  spacing: {
    one: 1,
    xs: 5,
    s: 8,
    sm: 10,
    ms: 12,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 50,
  },
  borderRadii: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    full: 100,
  },

  textVariants: TextVariants,
  inputVariants: InputVariants,
  buttonVariants: ButtonVariants,
  alertVariants: AlertVariants,
  cardVariants: CardVariants,
  imageVariants: ImageVariants,
});

export type Theme = typeof theme;
export default theme;
