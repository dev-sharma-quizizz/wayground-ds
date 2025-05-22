import React, { forwardRef, ReactNode } from 'react';
import type {
  AlignItems, AlignSelf, CommonProps, ContentTag, FlexDirection, FlexWrap, Gap,
  JustifyContent
} from '../../../types';

interface FlexProps extends CommonProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  self?: AlignSelf;
  gap?: Gap;
  rowGap?: Gap;
  columnGap?: Gap;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullSize?: boolean;
  as?: ContentTag;
  children?: ReactNode;
  className?: string;
}

const defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'start',
  align: 'stretch',
  as: 'div',
} as const;

const Flex = forwardRef<HTMLElement, FlexProps>(({
  direction = defaultProps.direction,
  wrap = defaultProps.wrap,
  justify = defaultProps.justify,
  align = defaultProps.align,
  as = defaultProps.as,
  self,
  gap,
  rowGap,
  columnGap,
  fullWidth,
  fullHeight,
  fullSize,
  grow,
  shrink,
  basis,
  relative,
  group,
  dataTestid,
  children,
  className = '',
  ...rest
}, ref) => {

  // Build class names based on props
  const classNames = [
    'flex',
    `flex-${direction}`,
    `flex-${wrap}`,
    `justify-${justify}`,
    `items-${align}`,
    self && `self-${self}`,
    gap && `gap-${gap}`,
    rowGap && `row-gap-${rowGap}`,
    columnGap && `column-gap-${columnGap}`,
    fullWidth && 'w-full',
    fullHeight && 'h-full',
    fullSize && 'w-full h-full',
    grow && 'flex-grow',
    shrink && 'flex-shrink',
    basis && `basis-${basis}`,
    relative && 'relative',
    group && 'group',
    className
  ].filter(Boolean).join(' ');

  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={classNames}
      data-testid={dataTestid}
      {...rest}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

export default Flex;
