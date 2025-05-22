import React, { forwardRef, ReactNode } from 'react';
import type {
  CommonProps, ContentTag, Display, DynamicSpacing, Sizing
} from '../../../types';
import useCommon from '../../../hooks/useCommon';

interface FixedSizeProps extends CommonProps {
  size?: DynamicSpacing;
  width?: Sizing;
  height?: Sizing;
  as?: ContentTag;
  display?: Display;
  children?: ReactNode;
  className?: string;
}

const defaultProps = {
  width: 'auto',
  height: 'auto',
  as: 'div',
} as const;

const FixedSize = forwardRef<HTMLElement, FixedSizeProps>(({
  size,
  width = defaultProps.width,
  height = defaultProps.height,
  as = defaultProps.as,
  display,
  grow,
  shrink,
  relative,
  basis,
  group,
  dataTestid,
  children,
  className = '',
  ...rest
}, ref) => {
  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();

  // Set width and height properties
  const sizeProps: Record<string, string> = {};

  // If size is specified, use it for both width and height
  if (size) {
    sizeProps.size = size;
  } else {
    // Otherwise use the individual width and height props
    if (width !== 'auto') {
      sizeProps.width = width;
    }
    if (height !== 'auto') {
      sizeProps.height = height;
    }
  }

  // Apply display if provided
  if (display) {
    sizeProps.display = display;
  }

  // Get common classes from useCommon
  const commonClasses = getCommonClasses({
    ...rest,
    ...sizeProps,
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
      className={`${commonClasses} ${className}`}
      data-testid={dataTestid}
    >
      {children}
    </Component>
  );
});

FixedSize.displayName = 'FixedSize';

export default FixedSize; 