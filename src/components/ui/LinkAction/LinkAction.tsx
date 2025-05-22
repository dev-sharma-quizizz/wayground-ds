import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';

type LinkActionTypes = 'action' | 'secondary' | 'error';

export interface LinkActionProps {
  type?: LinkActionTypes;
  size?: 'small' | 'default';
  text: string;
  dataTestid?: string;
  onClick?: () => void;
}

export const LinkAction: React.FC<LinkActionProps> = ({
  type = 'action',
  size = 'default',
  text = 'link action text',
  dataTestid = 'link-action',
  onClick,
}) => {
  const { theme, device } = useTheme();
  const [hover, setHover] = useState(false);

  const getColor = () => {
    switch (type) {
      case 'error':
        return '#D9003B'; // fail color
      case 'secondary':
        return '#6F6F6F'; // dark.secondary color
      case 'action':
      default:
        return '#6B4EFF'; // action color
    }
  };

  const getTextSize = () => {
    if (size === 'small') {
      return '0.875rem'; // content.small.bold
    }
    return '1rem'; // content.base.bold
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <span
      data-testid={dataTestid}
      style={{
        color: getColor(),
        fontSize: getTextSize(),
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: hover ? 'underline' : 'none',
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {text}
    </span>
  );
};

export default LinkAction; 