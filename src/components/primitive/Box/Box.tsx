import React from 'react';
import useCommon from '../../../hooks/useCommon';
import type { AlignSelf, CommonProps, ContentTag } from '../../../types';
import ContentTagComponent from '../../ui/ContentTagComponent/ContentTagComponent';

// Box props extend CommonProps
interface BoxProps extends CommonProps {
  self?: AlignSelf;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullSize?: boolean;
  as?: ContentTag;
  children?: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({
  as = 'div',
  grow,
  shrink,
  relative,
  basis,
  self,
  fullWidth,
  fullHeight,
  fullSize,
  children,
  className = '',
  dataTestid,
  group,
  ...rest
}) => {
  const { getCommonClasses } = useCommon();
  const css = getCommonClasses({
    grow,
    shrink,
    relative,
    basis,
    self,
    fullWidth,
    fullHeight,
    fullSize,
    ...rest
  });

  // For debugging purposes, implement a similar concept if needed
  const debugClasses = '';

  return (
    <ContentTagComponent
      as={as}
      className={`${css} ${group ? 'group' : ''} ${debugClasses} ${className}`}
      dataTestid={dataTestid}
    >
      {children}
    </ContentTagComponent>
  );
};

export default Box; 