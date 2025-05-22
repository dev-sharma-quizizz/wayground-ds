import React, { forwardRef, ReactNode } from 'react';
import type {
  CommonProps, DynamicSpacing, Translate, ZIndex
} from '../../../types';
import useCommon from '../../../hooks/useCommon';

interface FixedProps extends CommonProps {
  top?: DynamicSpacing;
  right?: DynamicSpacing;
  bottom?: DynamicSpacing;
  left?: DynamicSpacing;
  translate?: Translate;
  zIndex?: ZIndex;
  children?: ReactNode;
  className?: string;
}

const Fixed = forwardRef<HTMLDivElement, FixedProps>(({
  top,
  right,
  bottom,
  left,
  translate,
  zIndex,
  grow,
  shrink,
  relative,
  dataTestid,
  children,
  className = '',
  ...rest
}, ref) => {
  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();

  // Generate position-specific classes
  const positionClasses = [];
  if (top !== undefined) positionClasses.push(`top-${top}`);
  if (right !== undefined) positionClasses.push(`right-${right}`);
  if (bottom !== undefined) positionClasses.push(`bottom-${bottom}`);
  if (left !== undefined) positionClasses.push(`left-${left}`);
  if (translate) positionClasses.push(`translate-${translate}`);

  // Get common classes from useCommon
  const commonClasses = getCommonClasses({
    ...rest,
    grow,
    shrink,
    relative,
  } as any);

  // Define inline styles for z-index
  const style: React.CSSProperties = {};
  if (zIndex !== undefined) {
    style.zIndex = typeof zIndex === 'string' ? parseInt(zIndex, 10) : zIndex;
  }

  return (
    <div
      ref={ref}
      className={`fixed ${positionClasses.join(' ')} ${commonClasses} ${className}`}
      style={style}
      data-testid={dataTestid}
    >
      {children}
    </div>
  );
});

Fixed.displayName = 'Fixed';

export default Fixed; 