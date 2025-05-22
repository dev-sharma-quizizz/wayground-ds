import React from 'react';
import { ColumnsContext } from './ColumnsContext';
import type {
  Device, 
  Gap,
  DynamicSpacing,
  MarginShorthand,
  PaddingShorthand,
  Theme,
} from '../../../types';

interface ColumnsProps {
  count?: number;
  gap?: Gap;
  rowGap?: Gap;
  columnGap?: Gap;
  maxWidth?: DynamicSpacing;
  padding?: PaddingShorthand;
  margin?: MarginShorthand;
  relative?: boolean;
  fullHeight?: boolean;
  device?: Device;
  theme?: Theme;
  children?: React.ReactNode;
}

const Columns: React.FC<ColumnsProps> = ({
  count = 12,
  gap = '4',
  rowGap,
  columnGap,
  maxWidth = '320',
  padding,
  margin = '0 auto',
  relative,
  fullHeight,
  device = 'desktop', 
  theme = 'admin',
  children,
}) => {
  // Create classes manually
  const generateClasses = () => {
    const classes = [`grid grid-cols-${count}`, 'w-full h-fit'];
    
    if (padding) classes.push(`p-${padding}`);
    if (margin) classes.push(`m-${margin}`);
    if (maxWidth) classes.push(`max-w-${maxWidth}`);
    if (rowGap || gap) classes.push(`gap-y-${rowGap || gap}`);
    if (columnGap || gap) classes.push(`gap-x-${columnGap || gap}`);
    if (relative) classes.push('relative');
    if (fullHeight) classes.push('h-full');
    
    return classes.join(' ');
  };

  return (
    <ColumnsContext.Provider value={{ count, gap, device, theme }}>
      <div className={generateClasses()}>
        {children}
      </div>
    </ColumnsContext.Provider>
  );
};

export default Columns; 