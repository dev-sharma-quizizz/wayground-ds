import React, { forwardRef, ReactNode } from 'react';
import type { CommonProps, Gap, GridUnit } from '../../../types';
import useCommon from '../../../hooks/useCommon';

interface GridProps extends CommonProps {
  numRows?: GridUnit;
  numCols?: GridUnit;
  gap?: Gap;
  rowGap?: Gap;
  columnGap?: Gap;
  equalRowSize?: boolean;
  equalColSize?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullSize?: boolean;
  children?: ReactNode;
  className?: string;
}

const defaultProps = {
  equalRowSize: true,
  equalColSize: true,
  gap: '0',
  numRows: '2',
  numCols: '2',
} as const;

const Grid = forwardRef<HTMLDivElement, GridProps>(({
  numRows = defaultProps.numRows,
  numCols = defaultProps.numCols,
  gap = defaultProps.gap,
  rowGap,
  columnGap,
  equalRowSize = defaultProps.equalRowSize,
  equalColSize = defaultProps.equalColSize,
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

  // Define gap props to be passed to the getCommonClasses
  const gapProps: Record<string, string> = {};

  // Only add gap properties that should be applied based on what the user provided
  if (gap !== '0') {
    gapProps.gap = gap;
  } else {
    if (rowGap !== undefined) {
      gapProps.rowGap = rowGap;
    }
    if (columnGap !== undefined) {
      gapProps.columnGap = columnGap;
    }
  }

  // Get common classes from useCommon
  const commonClasses = getCommonClasses({
    ...rest,
    ...gapProps,
    fullWidth,
    fullHeight,
    fullSize,
    grow,
    shrink,
    basis,
    relative,
    group
  } as any);

  // Define grid styles
  const gridStyles = {
    gridTemplateRows: `repeat(${numRows}, minmax(0, ${equalRowSize ? '1fr' : 'max-content'}))`,
    gridTemplateColumns: `repeat(${numCols}, minmax(0, ${equalColSize ? '1fr' : 'max-content'}))`,
  };

  return (
    <div
      ref={ref}
      className={`grid w-full ${commonClasses} ${className}`}
      style={gridStyles}
      data-testid={dataTestid}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid; 