import React, { useMemo } from 'react';
import type { BGColor, BorderColor, BorderPosition, BorderRadiusShorthand, BorderShorthand, BorderSize, Cursor, DynamicSpacing, FloatingPosition, MarginShorthand, Overflow, PaddingShorthand, Shadow, SpacingRel, Translate, Visibility } from '../../../types';
import Absolute from '../Absolute/Absolute';

interface FloatingProps {
  position: FloatingPosition;
  offset?: SpacingRel;
  translate?: Translate;
  margin?: MarginShorthand;
  padding?: PaddingShorthand;
  bgColor?: BGColor;
  rounded?: BorderRadiusShorthand;
  borderSize?: BorderSize;
  borderColor?: BorderColor;
  border?: BorderShorthand;
  borderPosition?: BorderPosition;
  shadow?: Shadow;
  grow?: boolean;
  shrink?: boolean;
  hoverBgColor?: BGColor;
  groupHoverBgColor?: BGColor;
  activeBgColor?: BGColor;
  groupActiveBgColor?: BGColor;
  hoverBorderColor?: BorderColor;
  groupHoverBorderColor?: BorderColor;
  activeBorderColor?: BorderColor;
  groupActiveBorderColor?: BorderColor;
  overflow?: Overflow;
  cursor?: Cursor;
  visibility?: Visibility;
  relative?: boolean;
  group?: boolean;
  dataTestid?: string;
  children?: React.ReactNode;
}

const Floating: React.FC<FloatingProps> = ({
  position = 'top-right',
  offset = '2',
  children,
  ...restProps
}) => {
  const top = useMemo<DynamicSpacing | undefined>(() => {
    if (position === 'top-left' || position === 'top-right' || position === 'top') {
      return `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-left' || position === 'inset top-right' || position === 'inset bottom' || position === 'center') {
      return offset as DynamicSpacing;
    }
    return undefined;
  }, [position, offset]);

  const right = useMemo<DynamicSpacing | undefined>(() => {
    if (position === 'top-right' || position === 'bottom-right' || position === 'right') {
      return `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-right' || position === 'inset bottom-right' || position === 'inset right' || position === 'center') {
      return offset as DynamicSpacing;
    }
    return undefined;
  }, [position, offset]);

  const bottom = useMemo<DynamicSpacing | undefined>(() => {
    if (position === 'bottom-left' || position === 'bottom-right' || position === 'bottom') {
      return `-${offset}` as DynamicSpacing;
    } else if (position === 'inset bottom-left' || position === 'inset bottom-right' || position === 'inset bottom' || position === 'center') {
      return offset as DynamicSpacing;
    }
    return undefined;
  }, [position, offset]);

  const left = useMemo<DynamicSpacing | undefined>(() => {
    if (position === 'top-left' || position === 'bottom-left' || position === 'left') {
      return `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-left' || position === 'inset bottom-left' || position === 'inset left' || position === 'center') {
      return offset as DynamicSpacing;
    }
    return undefined;
  }, [position, offset]);

  return (
    <Absolute 
      top={top} 
      right={right} 
      bottom={bottom} 
      left={left} 
      {...restProps}
    >
      {children}
    </Absolute>
  );
};

export default Floating; 