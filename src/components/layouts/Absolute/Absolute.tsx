import React from 'react';
import type { CommonProps, Display, DynamicSpacing, Translate } from '../../../types';
import useCommon from '../../../hooks/useCommon';
import useDebugHook from '../../../hooks/useDebugHook';

interface AbsoluteProps extends CommonProps {
  top?: DynamicSpacing;
  right?: DynamicSpacing;
  bottom?: DynamicSpacing;
  left?: DynamicSpacing;
  translate?: Translate;
  fullHeight?: boolean;
  fullWidth?: boolean;
  display?: Display;
  children?: React.ReactNode;
}

const Absolute: React.FC<AbsoluteProps> = ({
  top,
  right,
  bottom,
  left,
  translate,
  fullHeight,
  fullWidth,
  display,
  grow,
  shrink,
  relative,
  group,
  dataTestid,
  children,
  ...props
}) => {
  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();
  
  // Get the debug classes
  const { debugClasses } = useDebugHook();
  
  // Generate position-specific classes
  const positionClasses = [];
  if (top !== undefined) positionClasses.push(`top-${top}`);
  if (right !== undefined) positionClasses.push(`right-${right}`);
  if (bottom !== undefined) positionClasses.push(`bottom-${bottom}`);
  if (left !== undefined) positionClasses.push(`left-${left}`);
  if (translate) positionClasses.push(`translate-${translate}`);
  if (fullHeight) positionClasses.push('h-full');
  if (fullWidth) positionClasses.push('w-full');
  if (display) positionClasses.push(`${display}`);
  
  // Get common classes from the props - pass all common props
  const commonClasses = getCommonClasses({
    grow,
    shrink,
    relative,
    group,
    ...props
  });

  console.log(commonClasses);
  
  return (
    <div 
      className={`absolute ${positionClasses.join(' ')} ${commonClasses} ${group ? 'group' : ''} ${debugClasses}`}
      data-testid={dataTestid}
      {...props}
    >
      {children}
    </div>
  );
};

export default Absolute; 