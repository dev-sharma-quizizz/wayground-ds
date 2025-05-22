import React from 'react';
import type { Animate, IconSize, TextColor, Visibility } from '../../../types';
import { useTheme } from '../../../hooks/useTheme';
import useCommon from '../../../hooks/useCommon';

export type IconType = 'solid' | 'regular' | 'brand' | 'kit';

export interface IconProps {
  size?: IconSize;
  type?: IconType;
  name: string;
  color?: TextColor;
  groupHoverColor?: TextColor;
  fixedWidth?: boolean;
  animate?: Animate;
  inline?: boolean;
  visibility?: Visibility;
  groupHoverVisibility?: Visibility;
  dataTestid?: string;
  id?: string;
  className?: string;
}

const defaultProps = {
  type: 'solid',
  size: '4',
  color: 'dark.primary',
  fixedWidth: true,
} as const;

const Icon: React.FC<IconProps> = ({
  size = defaultProps.size,
  type = defaultProps.type,
  name,
  color = defaultProps.color,
  groupHoverColor,
  fixedWidth = defaultProps.fixedWidth,
  animate,
  inline,
  visibility,
  groupHoverVisibility,
  dataTestid = '',
  id,
  className = '',
}) => {
  // Get the current theme from context if available
  const { theme } = useTheme();

  // Get the utility functions from useCommon
  const { getCommonClasses } = useCommon();

  // Build class names for the icon container
  const iconClasses = getCommonClasses({
    iconSize: size,
    textColor: color,
    fixedWidth,
    animate,
    inline,
    groupHoverTextColor: groupHoverColor,
    visibility,
    groupHoverVisibility,
  } as any);

  // Determine the icon type prefix
  let iconType = 'fas'; // default to solid
  if (type === 'regular') {
    iconType = 'far';
  } else if (type === 'brand') {
    iconType = 'fab';
  } else if (type === 'kit') {
    iconType = 'fak';
  }

  // Determine the icon name with fa- prefix
  const iconName = `fa-${name}`;

  // For immersive theme, use a different naming convention
  const thematicIcon = theme === 'immersive'
    ? `icon-${iconType}-${name}`
    : `${iconType} ${iconName}`;

  return (
    <div
      className={`flex justify-center items-center ${iconClasses} ${className} flex-shrink-0`}
      data-testid={dataTestid}
      id={id}
    >
      <i className={thematicIcon} />
    </div>
  );
};

export default Icon; 