// import {BoxProps} from '@shopify/restyle';
// import {Theme} from '.';

//type Variant = {[name: string]: BoxProps<Theme>};

export const CardVariants = {
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  cardMovie: {
    width: '100%',
    flexDirection: 'row',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    marginVertical: 'xs',
    padding: 'sm',
    backgroundColor: 'primary',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'm',
    borderRadius: 'm',
  },
};
