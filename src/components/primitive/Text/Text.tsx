import React, { forwardRef, ReactNode } from 'react';
import { classes } from '../../../utils/classes';
import type {
  CommonProps,
  ContentTag,
  Device,
  HeadingTag,
  TextVariant,
  Theme,
  TextWrap,
  Gap
} from '../../../types';
import ContentTagComponent from '../../ui/ContentTagComponent/ContentTagComponent';

const asValues: HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const invalidAsValues = asValues;

interface TextProps extends CommonProps {
  as?: ContentTag;
  children?: ReactNode;
  textVariant?: TextVariant;
  wrap?: TextWrap;
  className?: string;
}

const defaultProps = {
  as: 'p',
  textVariant: 'content.base',
} as const;

// We need to define the ref type that matches ContentTagComponent's ref type
type ContentTagRefType = {
  el: HTMLElement | null;
};

const Text = forwardRef<ContentTagRefType, TextProps>(({
  as = defaultProps.as,
  textVariant = defaultProps.textVariant,
  wrap,
  grow,
  shrink,
  children,
  dataTestid,
  className = '',
  ...rest
}, ref) => {
  // Validate textVariant
  switch (textVariant) {
    case 'display.stat':
    case 'display.text':
    case 'heading.base':
    case 'heading.large':
      throw new Error('Invalid text variant. Use Heading component instead!');
  }

  // Validate as prop
  if (invalidAsValues.includes(as as HeadingTag)) {
    throw new Error('Invalid as prop. Use one of the following values: div, ul, ol, li, span, p, section, label');
  }

  // Get device and theme from context or default values
  const device: Device = 'desktop';
  const theme: Theme = 'admin';

  // Generate CSS classes
  const cssProps = {
    ...rest,
    textVariant,
    textWrap: wrap,
    grow,
    shrink,
  };

  // Cast to any to avoid TypeScript issues with the tokens type
  const css = classes(cssProps as any, device, theme);
  const combinedClasses = `${css} ${className}`.trim();

  return (
    <ContentTagComponent
      as={as}
      className={combinedClasses}
      dataTestid={dataTestid}
      ref={ref}
    >
      {children}
    </ContentTagComponent>
  );
});

Text.displayName = 'Text';

export default Text; 