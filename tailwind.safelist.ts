import {
  AlignContentValues,
  AlignItemsValues,
  AlignSelfValues, BorderRadiusExtremeValues, BorderRadiusValues,
  CursorValues, DisplayValues, FlexDirectionValues,
  FlexWrapValues, GapValues, GradientDirectionValues, GradientStopPositionValues, JustifyContentValues,
  MarginValues, ObjectFitValues, OpacityValues, OverflowValues, OverscrollBehaviorValues,
  PaddingValues, SelectValues, ShadowValues, SizingValues,
  SpacingValues, TextAlignValues,
  TextDecorations,
  TextWrapValues,
  TranslateValues,
  VisibilityValues,
  WhitespaceValues,
  ZIndexValues,
  animateValues,
  bgColors,
  borderColors,
  borderSizes,
  decorationColors,
  lineClampValues,
  pointerEventsValues,
  textColors,
  textVariants,
  transitionValues,
} from './src/types';

function generateBorderRadiusValues(values, theme = '') {
  const prefixes = ['tl', 'tr', 'br', 'bl'];
  const result = [];

  for (let i = 0; i < values.length; i++) {
    result.push(theme ? `rounded-${theme}-${values[i]}` : `rounded-${values[i]}`);
    for (let j = 0; j < prefixes.length; j++) {
      result.push(theme ? `rounded-${prefixes[j]}-${theme}-${values[i]}` : `rounded-${prefixes[j]}-${values[i]}`);
    }
  }
  return result;
}

function generateMarginValues() {
  const absPrefix = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'];
  const allPrefix = absPrefix;

  // add negative values
  absPrefix.forEach((prefix) => {
    allPrefix.push(`-${prefix}`);
  });

  const margins = [];
  allPrefix.forEach((prefix) => {
    const marginValues = MarginValues.map(value => `${prefix}-${value}`);
    margins.push(...marginValues);
  });
  return margins;
}

function generateZIndexValues(values) {
  const zIndexes = [];
  for (const zIndex of values) {
    const parsedIndex = Number.parseInt(zIndex);
    zIndexes.push(parsedIndex < 0 ? `-z-${Math.abs(parsedIndex)}` : `z-${parsedIndex}`);
  }
  return zIndexes;
}

function generateGradientValues() {
  return [
    // Gradient base classes
    ...GradientDirectionValues.map(dir => `bg-gradient-${dir}`),
    // Gradient color stop positions
    ...GradientStopPositionValues.flatMap(pos => [
      `from-${pos}`,
      `via-${pos}`,
      `to-${pos}`,
    ]),
    // Gradient color stops with all possible colors
    ...bgColors.map(obj => `from-${obj.value.replace('bg-', '')}`),
    ...bgColors.map(obj => `via-${obj.value.replace('bg-', '')}`),
    ...bgColors.map(obj => `to-${obj.value.replace('bg-', '')}`),
  ];
}

const safelist = [
  ...generateMarginValues(),
  ...PaddingValues.map(value => `p-${value}`),
  ...PaddingValues.map(value => `px-${value}`),
  ...PaddingValues.map(value => `py-${value}`),
  ...PaddingValues.map(value => `pt-${value}`),
  ...PaddingValues.map(value => `pr-${value}`),
  ...PaddingValues.map(value => `pb-${value}`),
  ...PaddingValues.map(value => `pl-${value}`),
  ...GapValues.map(value => `gap-${value}`),
  ...GapValues.map(value => `gap-x-${value}`),
  ...GapValues.map(value => `gap-y-${value}`),
  ...generateBorderRadiusValues(BorderRadiusExtremeValues),
  ...generateBorderRadiusValues(BorderRadiusValues, 'admin'),
  ...generateBorderRadiusValues(BorderRadiusValues, 'immersive'),
  ...TextDecorations,
  ...TextDecorations.map(value => `group-hover:${value}`),
  ...SpacingValues.map(value => `underline-offset-${value}`),
  ...bgColors.map(obj => obj.value),
  ...bgColors.map(obj => obj.value.replace('bg', 'fill')),
  ...bgColors.map(obj => `hover:${obj.value}`),
  ...bgColors.map(obj => `group-hover:${obj.value}`),
  ...bgColors.map(obj => `peer-hover:${obj.value}`),
  ...bgColors.map(obj => `focus:${obj.value}`),
  ...bgColors.map(obj => `group-focus:${obj.value}`),
  ...bgColors.map(obj => `active:${obj.value}`),
  ...bgColors.map(obj => `group-active:${obj.value}`),
  ...bgColors.map(obj => `disabled:${obj.value}`),
  ...borderColors.map(obj => obj.value),
  ...textColors.map(obj => obj.value),
  ...textColors.map(obj => `group-hover:${obj.value}`),
  ...decorationColors.map(obj => obj.value),
  ...decorationColors.map(obj => `hover:${obj.value}`),
  ...decorationColors.map(obj => `active:${obj.value}`),
  ...Object.keys(borderSizes.all).map(key => borderSizes.all[key]),
  ...Object.keys(borderSizes.top).map(key => borderSizes.top[key]),
  ...Object.keys(borderSizes.right).map(key => borderSizes.right[key]),
  ...Object.keys(borderSizes.bottom).map(key => borderSizes.bottom[key]),
  ...Object.keys(borderSizes.left).map(key => borderSizes.left[key]),
  ...Object.keys(borderSizes.x).map(key => borderSizes.x[key]),
  ...Object.keys(borderSizes.y).map(key => borderSizes.y[key]),
  ...ShadowValues.map(value => `shadow-${value}`),
  ...ShadowValues.map(value => `hover:shadow-${value}`),
  ...FlexDirectionValues.map(value => `flex-${value}`),
  ...FlexWrapValues.map(value => `flex-${value}`),
  ...TextWrapValues.map(value => `text-${value}`),
  ...JustifyContentValues.map(value => `justify-${value}`),
  ...AlignItemsValues.map(value => `items-${value}`),
  ...AlignSelfValues.map(value => `self-${value}`),
  ...AlignContentValues.map(value => `content-${value}`),
  ...SizingValues.map(value => `w-${value}`),
  ...SizingValues.map(value => `h-${value}`),
  ...SizingValues.map(value => `min-w-${value}`),
  ...SizingValues.map(value => `min-h-${value}`),
  ...SizingValues.map(value => `max-w-${value}`),
  ...SizingValues.map(value => `min-w-${value}`),
  ...SizingValues.map(value => `max-h-${value}`),
  ...SpacingValues.map(value => `inset-${value}`),
  ...SpacingValues.map(value => `top-${value}`),
  ...SpacingValues.map(value => `right-${value}`),
  ...SpacingValues.map(value => `bottom-${value}`),
  ...SpacingValues.map(value => `left-${value}`),
  ...SpacingValues.map(value => `-top-${value}`),
  ...SpacingValues.map(value => `-right-${value}`),
  ...SpacingValues.map(value => `-bottom-${value}`),
  ...SpacingValues.map(value => `-left-${value}`),
  ...SpacingValues.map(value => `basis-${value}`),
  ...CursorValues.map(value => `cursor-${value}`),
  ...OverscrollBehaviorValues.map(value => `overscroll-${value}`),
  ...textVariants.map((obj) => {
    return obj.value;
  }),
  ...SelectValues.map(value => `select-${value}`),
  ...VisibilityValues.map(value => `${value}`),
  ...VisibilityValues.map(value => `group-hover:${value}`),
  ...ObjectFitValues.map(value => `object-${value}`),
  ...OverflowValues.map(value => `overflow-${value}`),
  ...animateValues.map(value => `animate-${value}`),
  ...lineClampValues.map(value => `line-clamp-${value}`),
  ...OpacityValues.map(value => `opacity-${value}`),
  ...OpacityValues.map(value => `group-hover:opacity-${value}`),
  ...TextAlignValues.map(value => `text-${value}`),
  ...transitionValues.map(value => `transition-${value}`),
  ...pointerEventsValues.map(value => `pointer-events-${value}`),
  ...DisplayValues.map(value => `${value}`),
  ...DisplayValues.map(value => `group-hover:${value}`),
  ...generateZIndexValues(ZIndexValues),
  ...WhitespaceValues.map(value => `whitespace-${value}`),
  'w-screen',
  'h-screen',
  'w-full',
  'h-full',
  'h-fit',
  'w-auto',
  'h-auto',
  'grid',
  'aspect-video',
  'inline',
  'box-border',
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => `grid-cols-${value}`),
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => `col-start-${value}`),
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => `col-span-${value}`),
  ...TranslateValues.map(value => `translate-x-${value}`),
  ...TranslateValues.map(value => `translate-y-${value}`),
  ...TranslateValues.map(value => `-translate-x-${value}`),
  ...TranslateValues.map(value => `-translate-y-${value}`),
  ...TranslateValues.map(value => `active:translate-y-${value}`),
  ...generateGradientValues(),
];

export default safelist;
