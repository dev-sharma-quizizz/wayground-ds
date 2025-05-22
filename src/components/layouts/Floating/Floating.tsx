import React, { ReactNode, useMemo } from 'react';
import type { BGColor, BorderColor, BorderPosition, BorderRadiusShorthand, BorderShorthand, BorderSize, Cursor, DynamicSpacing, FloatingPosition, MarginShorthand, Overflow, PaddingShorthand, Shadow, SpacingRel, Translate, Visibility, CommonProps } from '../../../types';
import Absolute from '../Absolute/Absolute';

interface FloatingProps extends CommonProps {
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
  children?: ReactNode;
  className?: string;
}

const defaultProps = {
  offset: '2',
  position: 'top-right',
} as const;

const Floating: React.FC<FloatingProps> = ({
  position = defaultProps.position,
  offset = defaultProps.offset,
  translate,
  children,
  className = '',
  ...rest
}) => {
  // Calculate the positioning values based on the position and offset
  const { top, right, bottom, left } = useMemo(() => {
    const result: Record<string, DynamicSpacing | undefined> = {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    };

    // Calculate top position
    if (position === 'top-left' || position === 'top-right' || position === 'top') {
      result.top = `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-left' || position === 'inset top-right' || position === 'inset bottom' || position === 'center') {
      result.top = offset as DynamicSpacing;
    }

    // Calculate right position
    if (position === 'top-right' || position === 'bottom-right' || position === 'right') {
      result.right = `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-right' || position === 'inset bottom-right' || position === 'inset right' || position === 'center') {
      result.right = offset as DynamicSpacing;
    }

    // Calculate bottom position
    if (position === 'bottom-left' || position === 'bottom-right' || position === 'bottom') {
      result.bottom = `-${offset}` as DynamicSpacing;
    } else if (position === 'inset bottom-left' || position === 'inset bottom-right' || position === 'inset bottom' || position === 'center') {
      result.bottom = offset as DynamicSpacing;
    }

    // Calculate left position
    if (position === 'top-left' || position === 'bottom-left' || position === 'left') {
      result.left = `-${offset}` as DynamicSpacing;
    } else if (position === 'inset top-left' || position === 'inset bottom-left' || position === 'inset left' || position === 'center') {
      result.left = offset as DynamicSpacing;
    }

    return result;
  }, [position, offset]);

  return (
    <Absolute
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      translate={translate}
      {...rest}
    >
      {children}
    </Absolute>
  );
};

export default Floating; 