import React, { forwardRef, ReactNode } from 'react';
import type {
  AlignItems, AlignSelf, CommonProps, ContentTag, FlexDirection, FlexWrap, Gap,
  JustifyContent
} from '../../../types';
import useCommon from '../../../hooks/useCommon';

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
  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();

  const commonClasses = getCommonClasses({
    ...rest,
    flexDirection: direction,
    flexWrap: wrap,
    justify,
    align,
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
  } as any);

  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`flex ${commonClasses} ${className}`}
      data-testid={dataTestid}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

export default Flex;
