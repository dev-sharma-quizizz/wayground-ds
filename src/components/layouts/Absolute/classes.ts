import type { 
  AlignContent, 
  AlignItems, 
  BorderPosition, 
  Device, 
  FlexDirection, 
  FlexWrap, 
  GradientConfig, 
  IconSize, 
  JustifyContent, 
  LineClamp, 
  MarginShorthand, 
  PaddingShorthand, 
  TextAlign, 
  TextColor, 
  TextDecoration, 
  TextDecorationColor, 
  TextVariant, 
  TextWrap, 
  Theme,
  Gap
} from '../../../types';

import { 
  AlignContentTokens, 
  AlignItemsTokens, 
  FlexDirectionTokens, 
  FlexWrapTokens, 
  IconSizes, 
  JustifyContentTokens, 
  TextWrapTokens, 
  bgColor, 
  borderColor, 
  borderSizes, 
  decorationColor, 
  textColor, 
  textVariant 
} from '../../../types';

// Simple printError utility since we don't have access to the external one
function printError(message: string): void {
  console.error(`[Error] ${message}`);
}

function shortHandClasses(value: string, prefix: string) {
  const classes = value.split(' ');
  const classesConfig = classes.map((val) => {
    const isNegative = val.startsWith('-');
    return {
      absValue: isNegative ? val.slice(1) : val,
      isNegative,
    };
  });

  let prefixTokens = [];
  let result = '';

  if (classes.length === 1) {
    prefixTokens = [prefix];
  } else if (classes.length === 2) {
    prefixTokens = [
      `${prefix}y`,
      `${prefix}x`,
    ];
  } else if (classes.length === 3) {
    prefixTokens = [
      `${prefix}t`,
      `${prefix}x`,
      `${prefix}b`,
    ];
  } else {
    prefixTokens = [
      `${prefix}t`,
      `${prefix}r`,
      `${prefix}b`,
      `${prefix}l`,
    ];
  }

  prefixTokens.forEach((token, index) => {
    if (classesConfig[index].isNegative) {
      result += `-${token}-${classesConfig[index].absValue} `;
    } else {
      result += `${token}-${classesConfig[index].absValue} `;
    }
  });

  return result;
}

function translateClasses(value: string, prefix: string) {
  const classes = value.split(' ');
  const prefixTokens = ['x', 'y'];
  let result = '';

  if (classes.length === 1) {
    for (let i = 0; i < prefixTokens.length; i++) {
      if (classes[0].includes('-')) {
        result += `-${prefix}-${prefixTokens[i]}-${classes[0].replace('-', '')} `;
      } else {
        result += `${prefix}-${prefixTokens[i]}-${classes[0]} `;
      }
    }
  } else if (classes.length === 2) {
    for (let i = 0; i < prefixTokens.length; i++) {
      if (classes[i].includes('-')) {
        result += `-${prefix}-${prefixTokens[i]}-${classes[i].replace('-', '')} `;
      } else {
        result += `${prefix}-${prefixTokens[i]}-${classes[i]} `;
      }
    }
  }
  return result;
}

function getColorClass(value: string, colorObject: any): string {
  const color = value.split('.');
  const numThemeInstances = color.filter(item => (item === 'admin' || item === 'immersive')).length;

  if (numThemeInstances > 1) {
    const index = color.findIndex(item => item === 'admin' || item === 'immersive');
    color.splice(index, 1);
  }

  const numDeviceInstances = color.filter(item => (item === 'desktop' || item === 'mobile')).length;

  if (numDeviceInstances > 1) {
    const index = color.findIndex(item => item === 'desktop' || item === 'mobile');
    color.splice(index, 1);
  }

  let finalValue = colorObject;
  for (let i = 0; i < color.length; i++) {
    finalValue = finalValue[color[i]];
  }

  if (typeof finalValue === 'string') {
    return finalValue;
  } else if (typeof finalValue === 'object') {
    if (finalValue.DEFAULT) {
      return finalValue.DEFAULT;
    } else {
      printError(`No default value found [${value}]`);
      return '';
    }
  }
  printError('No value found');
  return '';
}

function getBorderClass(value: string, borderPosition: BorderPosition = 'all'): string {
  const border = value.split(' ');
  if (border.length === 1) {
    return `${borderSizes[borderPosition][border[0]]} `;
  } else if (border.length === 2) {
    return `${borderSizes[borderPosition][border[0]]} ${getColorClass(border[1], borderColor)} `;
  } else if (border.length === 3) {
    return `${borderSizes[borderPosition][border[0]]} ${getColorClass(border[1], borderColor)} border-${border[2]} `;
  } else {
    printError('Invalid border value');
    return '';
  }
}

function getPositonalClass(value: string, prefix: string): string {
  return value.includes('-') ? `-${prefix}-${value.replace('-', '')} ` : `${prefix}-${value} `;
}

function getRoundedClass(value: string, theme: Theme, prefix: string = '') {
  if (value === 'full' || value === 'none') {
    return prefix ? `rounded-${prefix}-${value} ` : `rounded-${value} `;
  } else {
    return prefix ? `rounded-${prefix}-${theme}-${value} ` : `rounded-${theme}-${value} `;
  }
}

function getRoundedClasses(value: string, theme: Theme): string {
  const classes = value.split(' ');
  const classesLength = classes.length;
  let result = '';

  switch (classesLength) {
    case 1:
      result += getRoundedClass(classes[0], theme);
      break;
    case 2:
      result += `${getRoundedClass(classes[0], theme, 'tl')} ${getRoundedClass(classes[0], theme, 'br')} ${getRoundedClass(classes[1], theme, 'tr')} ${getRoundedClass(classes[1], theme, 'bl')} `;
      break;
    case 3:
      result += `${getRoundedClass(classes[0], theme, 'tl')} ${getRoundedClass(classes[1], theme, 'tr')} ${getRoundedClass(classes[1], theme, 'bl')} ${getRoundedClass(classes[2], theme, 'br')} `;
      break;
    case 4:
      result += `${getRoundedClass(classes[0], theme, 'tl')} ${getRoundedClass(classes[1], theme, 'tr')} ${getRoundedClass(classes[2], theme, 'br')} ${getRoundedClass(classes[3], theme, 'bl')} `;
      break;
    default:
      break;
  }
  return result;
}

function getZIndexClass(value: string): string {
  if (!value) {
    return '';
  }
  const parsedZIndex = Number.parseInt(value);
  if (Number.isNaN(parsedZIndex)) {
    printError('Invalid zIndex value');
    return '';
  }

  return parsedZIndex < 0 ? `-z-${Math.abs(parsedZIndex)} ` : `z-${parsedZIndex} `;
}

function getGradientClasses(gradient?: GradientConfig): string {
  if (!gradient) {
    return '';
  }

  const classes: string[] = [];

  // Add gradient direction
  if (gradient.direction) {
    classes.push(`bg-gradient-${gradient.direction}`);
  } else {
    classes.push('bg-gradient-to-r'); // Default direction
  }

  // Add color stops - strip the bg- prefix from color values
  if (gradient.from) {
    const fromColor = getColorClass(gradient.from.color, bgColor).replace(/^bg-/, '');
    classes.push(`from-${fromColor}`);
    if (gradient.from.position) {
      classes.push(`from-${gradient.from.position}`);
    }
  }

  if (gradient.via) {
    const viaColor = getColorClass(gradient.via.color, bgColor).replace(/^bg-/, '');
    classes.push(`via-${viaColor}`);
    if (gradient.via.position) {
      classes.push(`via-${gradient.via.position}`);
    }
  }

  if (gradient.to) {
    const toColor = getColorClass(gradient.to.color, bgColor).replace(/^bg-/, '');
    classes.push(`to-${toColor}`);
    if (gradient.to.position) {
      classes.push(`to-${gradient.to.position}`);
    }
  }

  return `${classes.join(' ')} `;
}

// Define the tokens type
export type tokens = Record<string, string | boolean | Gap | GradientConfig> & {
  gap?: Gap,
  rowGap?: Gap,
  columnGap?: Gap,
  textWrap?: 'wrap' | 'nowrap',
  textAlign?: TextAlign,
  textDecoration?: TextDecoration,
  textDecorationColor?: TextDecorationColor,
  textUnderlineOffset?: Gap,
  padding?: PaddingShorthand,
  groupHoverTextColor?: TextColor,
  textColor?: TextColor,
  textVariant?: TextVariant,
  margin?: MarginShorthand,
  lineClamp?: LineClamp,
  gradient?: GradientConfig,
};

export function classes(props: tokens, device: Device = 'desktop', theme: Theme = 'admin') {
  let classes = '';

  for (const key in props) {
    if (typeof props[key] !== 'undefined' && props[key] !== null) {
      switch (key) {
        case 'padding':
          classes += shortHandClasses(props[key] as string, 'p');
          break;
        case 'margin':
          classes += shortHandClasses(props[key] as string, 'm');
          break;
        case 'rowGap':
          classes += `gap-y-${props[key]} `;
          break;
        case 'columnGap':
          classes += `gap-x-${props[key]} `;
          break;
        case 'gap':
          classes += `gap-${props[key]} `;
          break;
        case 'flexDirection':
          classes += `${FlexDirectionTokens[props[key] as FlexDirection]} `;
          break;
        case 'flexWrap':
          classes += `${FlexWrapTokens[props[key] as FlexWrap]} `;
          break;
        case 'justify':
          classes += `${JustifyContentTokens[props[key] as JustifyContent]} `;
          break;
        case 'align':
          classes += `${AlignItemsTokens[props[key] as AlignItems]} `;
          break;
        case 'alignContent':
          classes += `${AlignContentTokens[props[key] as AlignContent]} `;
          break;
        case 'textColor':
          classes += `${getColorClass(`${props[key]}` as string, textColor)} `;
          break;
        case 'bgColor':
          classes += `${getColorClass(`${props[key]}` as string, bgColor)} `;
          break;
        case 'fillColor':
          classes += `${getColorClass(`${props[key]}` as string, bgColor).replace('bg', 'fill')} `;
          break;
        case 'hoverBgColor':
          classes += `hover:${getColorClass(`${props[key]}` as string, bgColor)} `;
          break;
        case 'groupHoverBgColor':
          classes += `group-hover:${getColorClass(`${props[key]}` as string, bgColor)} `;
          break;
        case 'activeBgColor':
          classes += `active:${getColorClass(`${props[key]}` as string, bgColor)} `;
          break;
        case 'groupActiveBgColor':
          classes += `group-active:${getColorClass(`${props[key]}` as string, bgColor)} `;
          break;
        case 'groupHoverTextDecoration':
          classes += `group-hover:${props[key]} `;
          break;
        case 'textDecoration':
          classes += `${props[key]} `;
          break;
        case 'textDecorationColor':
          classes += `${getColorClass(`${props[key]}` as string, decorationColor)} `;
          break;
        case 'hoverTextDecorationColor':
          classes += `hover:${getColorClass(`${props[key]}` as string, decorationColor)} `;
          break;
        case 'activeTextDecorationColor':
          classes += `active:${getColorClass(`${props[key]}` as string, decorationColor)} `;
          break;
        case 'textUnderlineOffset':
          classes += `underline-offset-${props[key]} `;
          break;
        case 'textVariant':
          classes += `${getColorClass(`${device}.${theme}.${props[key]}` as string, textVariant)} `;
          break;
        case 'rounded':
          classes += `${getRoundedClasses(props[key] as string, theme)}`;
          break;
        case 'width':
          classes += !props.size ? `w-${props[key]} ` : '';
          break;
        case 'height':
          classes += !props.size ? `h-${props[key]} ` : '';
          break;
        case 'minWidth':
          classes += `min-w-${props[key]} `;
          break;
        case 'minHeight':
          classes += `min-h-${props[key]} `;
          break;
        case 'maxWidth':
          classes += `max-w-${props[key]} `;
          break;
        case 'maxHeight':
          classes += `max-h-${props[key]} `;
          break;
        case 'fullWidth':
          classes += props[key] === true ? 'w-full ' : '';
          break;
        case 'fullHeight':
          classes += props[key] === true ? 'h-full ' : '';
          break;
        case 'fullSize':
          classes += props[key] === true ? 'w-full h-full ' : '';
          break;
        case 'size':
          classes += `w-${props[key]} h-${props[key]} `;
          break;
        case 'textWrap':
          classes += `${TextWrapTokens[props[key] as TextWrap]} `;
          break;
        case 'borderSize':
          classes += `${borderSizes[(props.borderPosition || 'all') as BorderPosition][props[key] as string]} `;
          break;
        case 'borderColor':
          classes += `${getColorClass(`${props[key]}` as string, borderColor)} `;
          break;
        case 'borderStyle':
          classes += `border-${props[key]} `;
          break;
        case 'hoverBorderColor':
          classes += `hover:${getColorClass(`${props[key]}` as string, borderColor)} `;
          break;
        case 'groupHoverBorderColor':
          classes += `group-hover:${getColorClass(`${props[key]}` as string, borderColor)} `;
          break;
        case 'activeBorderColor':
          classes += `active:${getColorClass(`${props[key]}` as string, borderColor)} `;
          break;
        case 'groupActiveBorderColor':
          classes += `group-active:${getColorClass(`${props[key]}` as string, borderColor)} `;
          break;
        case 'groupHoverTextColor':
          classes += `group-hover:${getColorClass(`${props[key]}` as string, textColor)} `;
          break;
        case 'groupHoverVisibility':
          classes += `group-hover:${props[key]} `;
          break;
        case 'groupHoverOpacity':
          classes += `group-hover:opacity-${props[key]} `;
          break;
        case 'border':
          classes += `${getBorderClass(props[key] as string, props.borderPosition as BorderPosition)} `;
          break;
        case 'shadow':
          classes += `shadow${props[key] === 'base' ? '' : `-${props[key]}`} `;
          break;
        case 'top':
          classes += getPositonalClass(props[key] as string, 'top');
          break;
        case 'right':
          classes += getPositonalClass(props[key] as string, 'right');
          break;
        case 'bottom':
          classes += getPositonalClass(props[key] as string, 'bottom');
          break;
        case 'left':
          classes += getPositonalClass(props[key] as string, 'left');
          break;
        case 'grow':
          classes += props[key] === true ? 'flex-grow ' : (props[key] === false ? 'flex-grow-0 ' : '');
          break;
        case 'shrink':
          classes += props[key] === true ? 'flex-shrink ' : (props[key] === false ? 'flex-shrink-0 ' : '');
          break;
        case 'iconSize':
          classes += `${props.fixedWidth ? IconSizes.fixedWidth[props[key] as IconSize] : IconSizes.hug[props[key] as IconSize]} `;
          break;
        case 'cursor':
          classes += `cursor-${props[key]} `;
          break;
        case 'select':
          classes += `select-${props[key]} `;
          break;
        case 'animate':
          classes += `animate-${props[key]} `;
          break;
        case 'visibility':
          classes += `${props[key]} `;
          break;
        case 'objectFit':
          classes += `object-${props[key]} `;
          break;
        case 'overflow':
          classes += `overflow-${props[key]} `;
          break;
        case 'relative':
          classes += props[key] === true ? 'relative ' : '';
          break;
        case 'lineClamp':
          classes += `line-clamp-${props[key]} `;
          break;
        case 'self':
          classes += `self-${props[key]} `;
          break;
        case 'translate':
          classes += translateClasses(props[key] as string, 'translate');
          break;
        case 'opacity':
          classes += `opacity-${props[key]} `;
          break;
        case 'textAlign':
          classes += `text-${props[key]} `;
          break;
        case 'basis':
          classes += `basis-${props[key]} `;
          break;
        case 'textTransform':
          classes += `${props[key]} `;
          break;
        case 'textOverflow':
          classes += `text-${props[key]} `;
          break;
        case 'italic':
          classes += props[key] === true ? 'italic ' : '';
          break;
        case 'inline':
          classes += props[key] === true ? 'inline-flex ' : '';
          break;
        case 'hoverShadow':
          classes += `hover:shadow${props[key] === 'base' ? '' : `-${props[key]}`} `;
          break;
        case 'hoverTextDecoration':
          classes += `hover:${props[key]} `;
          break;
        case 'transition':
          classes += `transition-${props[key]} `;
          break;
        case 'pointerEvents':
          classes += `pointer-events-${props[key]} `;
          break;
        case 'overscrollBehavior':
          classes += `overscroll-${props[key]} `;
          break;
        case 'breakWords':
          if (props[key] === true) {
            classes += 'break-words ';
          }
          break;
        case 'display':
          classes += `${props[key]} `;
          break;
        case 'zIndex':
          classes += getZIndexClass(props[key] as string);
          break;
        case 'groupHoverDisplay':
          classes += `group-hover:${props[key]} `;
          break;
        case 'whitespace':
          classes += `whitespace-${props[key]} `;
          break;
        case 'easing':
          classes += `ease-${props[key]} `;
          break;
        case 'blur':
          classes += `backdrop-blur${props[key] ? `-${props[key]}` : ''} `;
          break;
        case 'gradient':
          classes += getGradientClasses(props[key] as GradientConfig);
          break;
        default:
          break;
      }
    }
  }

  return classes;
}
