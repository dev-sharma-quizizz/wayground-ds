import type { ObjectDotNotation } from './utils/types';

// ----------------------------------- Spacing -----------------------------------
type Percentages = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4';

export type SpacingAbs = '0' | 'px' | '0.5' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '28' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100' | '120' | '140' | '160' | '180' | '200' | '240' | '300' | '320';
export type GridCellSize = '4' | '5' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100' | '120' | '140' | '160' | '180' | '200' | '240' | '300' | '320';
export type GridUnit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export type SpacingRel = SpacingAbs | Percentages | 'auto' | 'full' | 'screen';
export type Spacing = SpacingAbs | `-${SpacingAbs}`;
export type DynamicSpacing = Spacing | Percentages | 'auto' | 'full' | 'screen' | 'fit' | 'min' | 'max';
export type Sizing = DynamicSpacing | 'fit' | 'min' | 'max';
export type Gap = '0' | 'px' | '0.5' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10';
export type Padding = '0' | '0.5' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20';

export type ZIndex = '-1' | '0' | '1' | number;

type ValueWithSign = Padding | Percentages | SpacingAbs | `-${Padding}` | `-${Percentages}` | `-${SpacingAbs}`;

type RecursiveTranslate<N extends number> =
  N extends 1 ? ValueWithSign :
  `${ValueWithSign} ${RecursiveTranslate<Decrement<N>>}`;

export type Translate = ValueWithSign | RecursiveTranslate<2>;

type RecursivePadding<N extends number> =
  N extends 1 ? Padding : `${Padding} ${RecursivePadding<Decrement<N>>}`;

export type PaddingShorthand = Padding | RecursivePadding<2> | RecursivePadding<3> | RecursivePadding<4>;

export type MarginAbs = '0' | 'px' | '0.5' | '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | 'auto';
export type NegativeMarginAbs = 'px' | '0.5' | '1' | '2' | '3' | '4';
export type Margin = MarginAbs | `-${NegativeMarginAbs}`;

type Decrement<N> = N extends 4 ? 3 : N extends 3 ? 2 : N extends 2 ? 1 : never;

type RecursiveMargin<N extends number> =
  N extends 1 ? Margin : `${Margin} ${RecursiveMargin<Decrement<N>>}`;

// Now define your shorthand type with up to 4 steps of recursion
export type MarginShorthand = Margin | RecursiveMargin<2> | RecursiveMargin<3> | RecursiveMargin<4>;

export type AvatarSize = '4' | '5' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '30' | '40';
export type ImageSize = SpacingAbs | 'auto' | 'full' | 'screen';
export type VideoSize = SpacingAbs | 'auto' | 'full' | 'screen';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
export type TextOverflow = 'ellipsis' | 'clip';

export type Easing = 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear';
export type Scale = '0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1' | '1.1' | '1.2' | '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.8' | '1.9' | '2';
export type Rotate = '0' | '45' | '90' | '135' | '180' | '225' | '270' | '315' | '360';
// ----------------------------------- Spacing -----------------------------------

export type BorderRadius = 'none' | 'sm' | 'base' | 'lg' | 'xl' | 'full';

export type Opacity = '0' | '5' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100';

type RecursiveBorderRadius<N extends number> =
  N extends 1 ? BorderRadius : `${BorderRadius} ${RecursiveBorderRadius<Decrement<N>>}`;
export type BorderRadiusShorthand = BorderRadius | RecursiveBorderRadius<2> | RecursiveBorderRadius<3> | RecursiveBorderRadius<4>;

export type TextDecoration = 'underline' | 'line-through' | 'none';

export type FloatingPositions = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type FloatingPosition = `inset ${FloatingPositions}` | `${FloatingPositions}`;

export type MaskedBlurDirection = 'top' | 'bottom' | 'left' | 'right' | 'none';
export type Blur = 'none' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type Whitespace = 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';

export const bgColor = {
  surface: {
    primary: {
      DEFAULT: 'bg-ds-light-500',
      hover: 'bg-ds-light-300',
      pressed: 'bg-ds-light-200',
    },
    disabled: 'bg-ds-light-200',
    secondary: 'bg-ds-light-400',
    tertiary: 'bg-ds-light-300',
    other: {
      DEFAULT: 'bg-ds-dark-500-5',
      hover: 'bg-ds-dark-500-10',
      pressed: 'bg-ds-dark-500-20',
    },
    action: {
      DEFAULT: 'bg-ds-lilac-500',
      hover: 'bg-ds-lilac-400',
      pressed: 'bg-ds-lilac-600',
      faded: {
        DEFAULT: 'bg-ds-lilac-100',
        hover: 'bg-ds-lilac-200',
        pressed: 'bg-ds-lilac-300',
      },
    },
    info: {
      DEFAULT: 'bg-ds-info-500',
      hover: 'bg-ds-info-400',
      pressed: 'bg-ds-info-600',
      faded: {
        DEFAULT: 'bg-ds-info-100',
        hover: 'bg-ds-info-200',
        pressed: 'bg-ds-info-300',
      },
    },
    success: {
      DEFAULT: 'bg-ds-success-500',
      hover: 'bg-ds-success-400',
      pressed: 'bg-ds-success-600',
      faded: {
        DEFAULT: 'bg-ds-success-100',
        hover: 'bg-ds-success-200',
        pressed: 'bg-ds-success-300',
      },
    },
    warn: {
      DEFAULT: 'bg-ds-warn-500',
      hover: 'bg-ds-warn-400',
      pressed: 'bg-ds-warn-600',
      faded: {
        DEFAULT: 'bg-ds-warn-100',
        hover: 'bg-ds-warn-200',
        pressed: 'bg-ds-warn-300',
      },
    },
    fail: {
      DEFAULT: 'bg-ds-fail-500',
      hover: 'bg-ds-fail-400',
      pressed: 'bg-ds-fail-600',
      faded: {
        DEFAULT: 'bg-ds-fail-100',
        hover: 'bg-ds-fail-200',
        pressed: 'bg-ds-fail-300',
      },
    },
    super: {
      DEFAULT: 'bg-ds-super-500',
      hover: 'bg-ds-super-400',
      pressed: 'bg-ds-super-600',
      faded: {
        DEFAULT: 'bg-ds-super-100',
        hover: 'bg-ds-super-200',
        pressed: 'bg-ds-super-300',
      },
    },
    blue: {
      DEFAULT: 'bg-ds-blue-500',
      hover: 'bg-ds-blue-400',
      pressed: 'bg-ds-blue-600',
    },
    teal: {
      DEFAULT: 'bg-ds-teal-500',
      hover: 'bg-ds-teal-400',
      pressed: 'bg-ds-teal-600',
    },
    yellow: {
      DEFAULT: 'bg-ds-yellow-500',
      hover: 'bg-ds-yellow-400',
      pressed: 'bg-ds-yellow-600',
    },
    pink: {
      DEFAULT: 'bg-ds-pink-500',
      hover: 'bg-ds-pink-400',
      pressed: 'bg-ds-pink-600',
    },
    violet: {
      DEFAULT: 'bg-ds-violet-500',
      hover: 'bg-ds-violet-400',
      pressed: 'bg-ds-violet-600',
    },
    overlay: {
      dark: 'bg-ds-dark-500-80',
      light: 'bg-ds-dark-500-50',
    },
    dark: {
      80: 'bg-ds-dark-500-80',
    },
    light: {
      50: 'bg-ds-dark-500-50',
    },
    transparent: {
      DEFAULT: 'bg-transparent',
    },
  },
  admin: {
    background: {
      light: {
        primary: 'bg-ds-light-400',
        secondary: 'bg-ds-light-500',
      },
      purple: 'bg-ds-brand-500',
    },
  },
  immersive: {
    background: {
      primary: 'bg-immersive-dark-500',
      secondary: 'bg-immersive-dark-300',
      tertiary: 'bg-immersive-violet-700',
      override: {
        primary: 'bg-immersive-override-background',
        dark: 'bg-immersive-override-background-dark',
      },
    },
    surface: {
      primary: {
        DEFAULT: 'bg-immersive-dark-500-80',
        hover: 'bg-immersive-dark-500-60', // TODO: This does not exist in the design system
        pressed: 'bg-immersive-dark-500-90',
        disabled: 'bg-immersive-dark-200',
      },
      secondary: 'bg-immersive-dark-500-50',
      tertiary: 'bg-immersive-dark-500-20',
      altPrimary: {
        DEFAULT: 'bg-immersive-light-500',
        hover: 'bg-immersive-light-500-90',
        pressed: 'bg-immersive-light-500-80',
        disabled: 'bg-immersive-light-200',
      },
      altSecondary: {
        DEFAULT: 'bg-immersive-light-500-20',
        hover: 'bg-immersive-light-500-30',
        pressed: 'bg-immersive-light-500-10',
        disabled: 'bg-immersive-light-500-5',
      },
      altTertiary: 'bg-immersive-light-500-10',
      action: {
        DEFAULT: 'bg-immersive-lilac-400',
        hover: 'bg-immersive-lilac-300',
        pressed: 'bg-immersive-lilac-500',
        faded: {
          DEFAULT: 'bg-immersive-lilac-400-20',
          hover: 'bg-immersive-lilac-400-30',
          pressed: 'bg-immersive-lilac-400-10',
        },
      },
      // Caution: This is not to be used other than Corporate Branding - Immersive
      override: {
        DEFAULT: 'bg-immersive-override-default',
        hover: 'bg-immersive-override-hover',
        pressed: 'bg-immersive-override-pressed',
        faded: {
          DEFAULT: 'bg-immersive-override-default-20',
          hover: 'bg-immersive-override-default-30',
          pressed: 'bg-immersive-override-default-10',
        },
      },
      info: {
        DEFAULT: 'bg-immersive-blue-400',
        hover: 'bg-immersive-blue-300',
        pressed: 'bg-immersive-blue-500',
        faded: {
          DEFAULT: 'bg-immersive-blue-400-20',
          hover: 'bg-immersive-blue-400-30',
          pressed: 'bg-immersive-blue-400-10',
        },
      },
      success: {
        DEFAULT: 'bg-immersive-green-400',
        hover: 'bg-immersive-green-300',
        pressed: 'bg-immersive-green-500',
        faded: {
          DEFAULT: 'bg-immersive-green-400-20',
          hover: 'bg-immersive-green-400-30',
          pressed: 'bg-immersive-green-400-10',
        },
      },
      warn: {
        DEFAULT: 'bg-immersive-yellow-400',
        hover: 'bg-immersive-yellow-300',
        pressed: 'bg-immersive-yellow-500',
        faded: {
          DEFAULT: 'bg-immersive-yellow-400-20',
          hover: 'bg-immersive-yellow-400-30',
          pressed: 'bg-immersive-yellow-400-10',
        },
      },
      fail: {
        DEFAULT: 'bg-immersive-red-400',
        hover: 'bg-immersive-red-300',
        pressed: 'bg-immersive-red-500',
        faded: {
          DEFAULT: 'bg-immersive-red-400-20',
          hover: 'bg-immersive-red-400-30',
          pressed: 'bg-immersive-red-400-10',
        },
      },
      overlay: {
        primary: 'bg-immersive-dark-500-80',
        secondary: 'bg-immersive-dark-500-50',
      },
    },
  },
};

export type BGColor = ObjectDotNotation<typeof bgColor>;

export const borderColor = {
  transparent: 'border-transparent',
  primary: 'border-ds-light-500',
  dark: {
    'DEFAULT': 'border-ds-dark-500-20',
    'high-contrast': 'border-ds-dark-500-40',
  },
  light: {
    'DEFAULT': 'border-ds-light-500-20',
    'high-contrast': 'border-ds-light-500-40',
  },
  action: {
    DEFAULT: 'border-ds-lilac-500-40',
    solid: 'border-ds-lilac-500',
  },
  info: {
    DEFAULT: 'border-ds-info-500-40',
    solid: 'border-ds-info-500',
  },
  success: {
    DEFAULT: 'border-ds-success-500-40',
    solid: 'border-ds-success-500',
  },
  warn: {
    DEFAULT: 'border-ds-warn-500-40',
    solid: 'border-ds-warn-500',
  },
  fail: {
    DEFAULT: 'border-ds-fail-500-40',
    solid: 'border-ds-fail-500',
  },
  super: {
    DEFAULT: 'border-ds-super-500-40',
    solid: 'border-ds-super-500',
  },
  immersive: {
    primary: {
      'DEFAULT': 'border-immersive-dark-400-20',
      'high-contrast': 'border-immersive-dark-500-40',
    },
    altPrimary: {
      'DEFAULT': 'border-immersive-light-500-20',
      'high-contrast': 'border-immersive-light-500-40',
      'max-contrast': 'border-immersive-light-500-80',
    },
    action: {
      DEFAULT: 'border-immersive-lilac-400-40',
      solid: 'border-immersive-lilac-400',
    },
    info: {
      DEFAULT: 'border-immersive-blue-400-40',
      solid: 'border-immersive-blue-400',
    },
    success: {
      DEFAULT: 'border-immersive-green-400-40',
      solid: 'border-immersive-green-400',
    },
    warn: {
      DEFAULT: 'border-immersive-yellow-400-40',
      solid: 'border-immersive-yellow-400',
    },
    fail: {
      DEFAULT: 'border-immersive-red-400-40',
      solid: 'border-immersive-red-400',
    },
  },
};

export type BorderColor = ObjectDotNotation<typeof borderColor>;

export interface MapObject {
  [key: string]: string | MapObject,
};

export type BorderPosition = 'all' | 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y';
export type BorderStyle = 'solid' | 'dashed';

interface BorderSizeMap {
  all: MapObject,
  top: MapObject,
  right: MapObject,
  bottom: MapObject,
  left: MapObject,
  x: MapObject,
  y: MapObject,
}

export const borderSizes: BorderSizeMap = {
  all: {
    0: 'border-0',
    1: 'border',
    2: 'border-2',
  },
  top: {
    0: 'border-t-0',
    1: 'border-t',
    2: 'border-t-2',
  },
  right: {
    0: 'border-r-0',
    1: 'border-r',
    2: 'border-r-2',
  },
  bottom: {
    0: 'border-b-0',
    1: 'border-b',
    2: 'border-b-2',
  },
  left: {
    0: 'border-l-0',
    1: 'border-l',
    2: 'border-l-2',
  },
  x: {
    0: 'border-x-0',
    1: 'border-x',
    2: 'border-x-2',
  },
  y: {
    0: 'border-y-0',
    1: 'border-y',
    2: 'border-y-2',
  },
};

export type BorderSize = '0' | '1' | '2';

export type BorderShorthand = `${BorderSize} ${BorderColor}` | `${BorderSize} ${BorderColor} ${BorderStyle}`;

export type Shadow = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

export const textVariant = {
  desktop: {
    admin: {
      display: {
        stat: 'text-display-stat font-semibold',
        text: 'text-display-text font-semibold',
      },
      heading: {
        large: 'text-header-large font-semibold',
        base: 'text-header-base font-semibold',
      },
      content: {
        large: {
          DEFAULT: 'text-content-large font-medium',
          bold: 'text-content-large font-semibold',
        },
        base: {
          DEFAULT: 'text-content-base font-medium',
          bold: 'text-content-base font-semibold',
        },
        small: {
          DEFAULT: 'text-content-small font-medium',
          bold: 'text-content-small font-semibold',
        },
      },
      control: {
        large: 'text-control-large font-semibold',
        base: 'text-control-base font-semibold',
        small: 'text-control-small font-semibold',
      },
      caption: {
        base: 'text-caption font-medium',
        bold: 'text-caption font-semibold',
      },
    },
    immersive: {
      display: {
        base: 'text-display-base-immersive font-bold',
        large: 'text-display-large-immersive font-bold',
      },
      heading: {
        base: 'text-header-immersive font-bold',
      },
      content: {
        large: {
          DEFAULT: 'text-content-large-immersive font-semibold',
          bold: 'text-content-large-immersive font-bold',
        },
        base: {
          DEFAULT: 'text-content-base-immersive font-semibold',
          bold: 'text-content-base-immersive font-bold',
        },
        small: {
          DEFAULT: 'text-content-small-immersive font-semibold',
          bold: 'text-content-small-immersive font-bold',
        },
      },
      control: {
        large: 'text-control-large-immersive font-bold',
        base: 'text-control-base-immersive font-bold',
        small: 'text-control-small-immersive font-bold',
      },
      caption: {
        base: 'text-caption-immersive font-semibold',
      },
    },
  },
  mobile: {
    admin: {
      display: {
        stat: 'text-display-stat-mobile font-semibold',
        text: 'text-display-text-mobile font-semibold',
      },
      heading: {
        large: 'text-header-large-mobile font-semibold',
        base: 'text-header-base-mobile font-semibold',
      },
      content: {
        large: {
          DEFAULT: 'text-content-large-mobile font-medium',
          bold: 'text-content-large-mobile font-semibold',
        },
        base: {
          DEFAULT: 'text-content-base-mobile font-medium',
          bold: 'text-content-base-mobile font-semibold',
        },
        small: {
          DEFAULT: 'text-content-small-mobile font-medium',
          bold: 'text-content-small-mobile font-semibold',
        },
      },
      control: {
        large: 'text-control-large-mobile font-semibold',
        base: 'text-control-base-mobile font-semibold',
        small: 'text-control-small-mobile font-semibold',
      },
      caption: {
        base: 'text-caption-mobile font-medium',
        bold: 'text-caption-mobile font-semibold',
      },
    },
    immersive: {
      display: {
        base: 'text-display-immersive-mobile font-bold',
      },
      heading: {
        base: 'text-header-immersive-mobile font-bold',
      },
      content: {
        large: {
          DEFAULT: 'text-content-large-immersive-mobile font-semibold',
          bold: 'text-content-large-immersive-mobile font-bold',
        },
        base: {
          DEFAULT: 'text-content-base-immersive-mobile font-semibold',
          bold: 'text-content-base-immersive-mobile font-bold',
        },
      },
      control: {
        large: 'text-control-large-immersive-mobile font-bold',
        base: 'text-control-base-immersive-mobile font-bold',
      },
      caption: {
        base: 'text-caption-immersive-mobile font-semibold',
      },
    },
  },
};

export type TextVariant = ObjectDotNotation<typeof textVariant.desktop.admin>;

export const TextWrapTokens = {
  wrap: 'text-wrap',
  nowrap: 'text-nowrap',
};

export type TextWrap = keyof typeof TextWrapTokens;

export const textColor = {
  dark: {
    primary: 'text-ds-dark-500',
    secondary: 'text-ds-dark-200',
    tertiary: 'text-ds-dark-100',
  },
  light: {
    primary: 'text-ds-light-500',
    secondary: 'text-ds-light-500-80',
    tertiary: 'text-ds-light-500-50',
  },
  action: 'text-ds-lilac-600',
  info: 'text-ds-info-600',
  success: 'text-ds-success-600',
  warn: 'text-ds-warn-600',
  fail: 'text-ds-fail-600',
  super: 'text-ds-super-600',
  immersive: {
    primary: 'text-immersive-light-500',
    secondary: 'text-immersive-light-500-80',
    tertiary: 'text-immersive-light-500-30',
    altPrimary: 'text-immersive-dark-500',
    altSecondary: 'text-immersive-dark-300',
    altTertiary: 'text-immersive-dark-100',
    action: 'text-immersive-lilac-300',
    info: 'text-immersive-blue-300',
    success: 'text-immersive-green-300',
    warn: 'text-immersive-yellow-300',
    fail: 'text-immersive-red-300',
    // Caution: This is not to be used other than Corporate Branding - Immersive
    override: 'text-immersive-override-text',
  },
};

export const decorationColor = {
  immersive: {
    altPrimaryHighContrast: 'decoration-immersive-light-500-40',
    altPrimary: 'decoration-immersive-light-500-20',
    altSecondaryDisabled: 'decoration-immersive-light-500-5',
  },
};

export type TextColor = ObjectDotNotation<typeof textColor>;
export type TextDecorationColor = ObjectDotNotation<typeof decorationColor>;

export const FlexDirectionTokens = {
  'row': 'flex-row',
  'col': 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

// ----------------------------------- Flex -----------------------------------
export type FlexDirection = keyof typeof FlexDirectionTokens;

export const FlexWrapTokens = {
  'wrap': 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
  'nowrap': 'flex-nowrap',
};

export type FlexWrap = keyof typeof FlexWrapTokens;

export const JustifyContentTokens = {
  normal: 'justify-normal',
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
};

export type JustifyContent = keyof typeof JustifyContentTokens;

export const AlignItemsTokens = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

export type AlignItems = keyof typeof AlignItemsTokens;

export const AlignSelfTokens = {
  start: 'self-start',
  end: 'self-end',
  center: 'self-center',
  baseline: 'self-baseline',
  stretch: 'self-stretch',
  auto: 'self-auto',
};

export type AlignSelf = keyof typeof AlignSelfTokens;

export const AlignContentTokens = {
  normal: 'content-normal',
  start: 'content-start',
  end: 'content-end',
  center: 'content-center',
  between: 'content-between',
  around: 'content-around',
  evenly: 'content-evenly',
  baseline: 'content-baseline',
  stretch: 'content-stretch',
};

export type AlignContent = keyof typeof AlignContentTokens;
// ----------------------------------- Flex -----------------------------------

export type Device = 'mobile' | 'desktop';
export type Theme = 'admin' | 'immersive';
// for immersive context only
export interface CorporateBranding {
  bgColor: string,
  hoverBgColor: string,
  activeBgColor: string,
  textColor: string,
  backgroundShades: {
    primary: string,
    dark: string,
  },
};

interface colorOBJ {
  [s: string]: string | colorOBJ,
}

interface color {
  path: string,
  value: string,
}

export const bgColors: color[] = [];
export const borderColors: color[] = [];
export const textColors: color[] = [];
export const decorationColors: color[] = [];

export type Animate = 'spin';
export const animateValues = ['spin'];

function traverse(obj: colorOBJ | string, path: string, out: color[] = []) {
  if (typeof obj === 'string') {
    out.push({
      path: path.includes('.DEFAULT') ? path.replace('.DEFAULT', '') : path,
      value: obj,
    });
  } else {
    Object.keys(obj).forEach((key) => {
      traverse(obj[key], `${path ? `${path}.` : ''}${key}`, out);
    });
  }
}
traverse(bgColor, '', bgColors);
traverse(borderColor, '', borderColors);
traverse(textColor, '', textColors);
traverse(decorationColor, '', decorationColors);

export type SpacingFull = SpacingAbs | 'auto' | 'screen' | 'full' | Percentages;

const PercentageValues: Percentages[] = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4'];

export const SpacingValuesWithoutPercentage: SpacingAbs[] = ['0', 'px', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '14', '16', '18', '20', '24', '30', '40', '50', '60', '70', '80', '90', '100', '120', '140', '160', '180', '200', '240', '300', '320'];
export const SpacingValues: SpacingFull[] = [...SpacingValuesWithoutPercentage, 'auto', 'screen', 'full', ...PercentageValues];
export const SizingValues: Sizing[] = [...SpacingValues, 'fit', 'min', 'max'];
export const GridCellSizeValues: Spacing[] = ['4', '6', '8', '10', '12', '14', '16', '18', '20', '24', '30', '40', '50', '60', '70', '80', '90', '100', '120', '140', '160', '180', '200', '240', '300', '320'];
export const GridUnitValues: GridUnit[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export const GapValues: Gap[] = ['0', 'px', '0.5', '1', '2', '3', '4', '5', '6', '8', '10'];
export const MarginValues: Array<Margin> = ['-px', '-0.5', '-1', '-2', '-3', '-4', '0', 'px', '0.5', '1', '2', '3', '4', '6', '8', '10', '12', '14', '16', '18', '20', 'auto'];
export const PaddingValues: Padding[] = ['0', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '14', '16', '18', '20'];
export const BorderRadiusExtremeValues: BorderRadius[] = ['none', 'full'];
export const BorderRadiusValues: BorderRadius[] = ['sm', 'base', 'lg', 'xl', ...BorderRadiusExtremeValues];
export const ShadowValues: Shadow[] = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'inner'];
export const TextDecorations: TextDecoration[] = ['underline', 'line-through', 'none'];
export const FlexDirectionValues: FlexDirection[] = ['row', 'col', 'row-reverse', 'col-reverse'];
export const FlexWrapValues: FlexWrap[] = ['wrap', 'wrap-reverse', 'nowrap'];
export const TextWrapValues: TextWrap[] = ['wrap', 'nowrap'];
export const JustifyContentValues: JustifyContent[] = ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
export const AlignItemsValues: AlignItems[] = ['start', 'end', 'center', 'baseline', 'stretch'];
export const AlignSelfValues: AlignSelf[] = ['start', 'end', 'center', 'baseline', 'stretch', 'auto'];
export const AlignContentValues: AlignContent[] = ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch'];
export const ImageSizeValues: ImageSize[] = [...SpacingValuesWithoutPercentage, 'auto', 'full', 'screen'];
export const AvatarSizeValues: AvatarSize[] = ['4', '5', '6', '8', '10', '12', '14', '16', '18', '20', '24', '30', '40'];
export const OpacityValues: Opacity[] = ['0', '5', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
export const TextAlignValues: TextAlign[] = ['left', 'center', 'right', 'justify'];
export const TextTransformValues: TextTransform[] = ['uppercase', 'lowercase', 'capitalize', 'normal-case'];
export const BlurValues: Blur[] = ['none', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'];

export const TranslateValues: Translate[] = [...SpacingValuesWithoutPercentage, ...PercentageValues];

export const textVariants: color[] = [];

traverse(textVariant, '', textVariants);

export type Portal = '#layer-1' | '#layer-2' | '#layer-3' | '#layer-4' | '#layer-5';

export type IconSize = '3' | '4' | '5' | '6' | '8' | '10' | '12' | '14';

export const IconSizes = {
  fixedWidth: {
    3: 'w-3 h-3 text-xtn',
    4: 'w-4 h-4 text-xs',
    5: 'w-5 h-5 text-sm',
    6: 'w-6 h-6 text-base',
    8: 'w-8 h-8 text-xl',
    10: 'w-10 h-10 text-3xl',
    12: 'w-12 h-12 text-6xl',
    14: 'w-14 h-14 text-7xl',
  },
  hug: {
    3: 'h-3 text-xtn',
    4: 'h-4 text-xs',
    5: 'h-5 text-sm',
    6: 'h-6 text-base',
    8: 'h-8 text-xl',
    10: 'h-10 text-3xl',
    12: 'h-12 text-6xl',
    14: 'h-14 text-7xl',
  },
};

export const SelectValues = ['none', 'text', 'all', 'auto'];
export const VisibilityValues = ['visible', 'invisible', 'collapse'];
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export const ObjectFitValues: ObjectFit[] = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
];

export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';
export const OverflowValues: Overflow[] = ['visible', 'hidden', 'scroll', 'auto'];

export const ZIndexValues: ZIndex[] = ['-1', '0', '1'];

export type Visibility = 'visible' | 'invisible' | 'collapse';
export type Cursor = 'pointer' | 'default' | 'text' | 'col-resize' | 'row-resize' | 'not-allowed' | 'auto' | 'pointer' | 'wait' | 'move' | 'help' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing';
export const CursorValues: Cursor[] = ['pointer', 'default', 'text', 'col-resize', 'row-resize', 'not-allowed', 'auto', 'pointer', 'wait', 'move', 'help', 'zoom-in', 'zoom-out', 'grab', 'grabbing'];
export type OverscrollBehavior = 'auto' | 'contain' | 'none';
export const OverscrollBehaviorValues: OverscrollBehavior[] = ['auto', 'contain', 'none'];

export type Display = 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'table' | 'inline-table' | 'table-caption' | 'table-cell' | 'table-column' | 'table-column-group' | 'table-footer-group' | 'table-header-group' | 'table-row' | 'table-row-group' | 'flow-root' | 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-group' | 'ruby-text-group' | 'contents' | 'list-item' | 'hidden';
export const DisplayValues: Display[] = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row', 'table-row-group', 'flow-root', 'ruby', 'ruby-base', 'ruby-text', 'ruby-base-group', 'ruby-text-group', 'contents', 'list-item', 'hidden'];

export const EasingValues: Easing[] = ['ease-out', 'ease-in', 'ease-in-out', 'linear'];
export const WhitespaceValues: Whitespace[] = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'];

export type GradientDirection = 'to-t' | 'to-tr' | 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl';
export const GradientDirectionValues: GradientDirection[] = ['to-t', 'to-tr', 'to-r', 'to-br', 'to-b', 'to-bl', 'to-l', 'to-tl'];

export type GradientStopPosition = '0%' | '5%' | '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%';
export const GradientStopPositionValues: GradientStopPosition[] = ['0%', '5%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

export interface GradientColorStop {
  color: BGColor,
  position?: GradientStopPosition,
}

export interface GradientConfig {
  direction?: GradientDirection,
  from?: GradientColorStop,
  via?: GradientColorStop,
  to?: GradientColorStop,
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CommonProps = {
  margin?: MarginShorthand,
  padding?: PaddingShorthand,
  bgColor?: BGColor,
  gradient?: GradientConfig,
  rounded?: BorderRadiusShorthand,
  borderSize?: BorderSize,
  borderColor?: BorderColor,
  border?: BorderShorthand,
  borderPosition?: BorderPosition,
  borderStyle?: BorderStyle,
  shadow?: Shadow,
  grow?: boolean,
  shrink?: boolean,
  basis?: SpacingRel,
  hoverBgColor?: BGColor,
  groupHoverBgColor?: BGColor,
  activeBgColor?: BGColor,
  groupActiveBgColor?: BGColor,
  hoverBorderColor?: BorderColor,
  groupHoverBorderColor?: BorderColor,
  groupHoverVisibility?: Visibility,
  groupHoverOpacity?: Opacity,
  groupHoverDisplay?: Display,
  activeBorderColor?: BorderColor,
  groupActiveBorderColor?: BorderColor,
  maxWidth?: Sizing,
  minWidth?: Sizing,
  minHeight?: Sizing,
  maxHeight?: Sizing,
  hoverShadow?: Shadow,
  overflow?: Overflow,
  overscrollBehavior?: OverscrollBehavior,
  cursor?: Cursor,
  visibility?: Visibility,
  relative?: boolean,
  opacity?: Opacity,
  transition?: Transition,
  group?: boolean,
  pointerEvents?: PointerEvents,
  translate?: Translate,
  zIndex?: ZIndex,
  dataTestid?: string,
};

export type Transition = 'none' | 'all' | 'colors' | 'opacity' | 'shadow' | 'transform';
export const transitionValues = ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'];

export type PointerEvents = 'auto' | 'none';
export const pointerEventsValues = ['auto', 'none'];

export type ContentTag = 'div' | 'ul' | 'ol' | 'li' | 'span' | 'p' | 'section' | 'label' | 'thead' | 'tbody' | 'tr' | 'td' | 'nav' | 'main';
export type Selection = 'none' | 'text' | 'all' | 'auto';
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export type BoxProps = {
  as?: ContentTag,
} & CommonProps;

export const lineClampValues = [1, 2, 3, 4, 5, 6, 'none'];
export type LineClamp = '1' | '2' | '3' | '4' | '5' | '6' | 'none';

export const teleportLayers = ['#overlay-layer-1', '#modal-layer-2', '#modal-overlay-layer-3', '#third-party-layer-4', '#app-body-teleport'] as const;
export type TeleportLayers = typeof teleportLayers[number];
