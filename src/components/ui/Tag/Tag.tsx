import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

type TagVariant = 'primary' | 'secondary' | 'white' | 'other';

export interface TagProps {
  size?: 'md' | 'lg';
  variant?: TagVariant;
  disabled?: boolean;
  icon?: string;
  text: string;
  avatarSrc?: string;
  onClick?: () => void;
  onClose?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  size = 'md',
  variant = 'primary',
  disabled = false,
  icon = '',
  text = '',
  avatarSrc,
  onClick,
  onClose,
}) => {
  const { theme, device } = useTheme();

  const getBgColor = () => {
    if (disabled) return '#F0F0F0'; // surface.secondary
    
    switch (variant) {
      case 'primary':
        return '#6B4EFF'; // surface.action
      case 'secondary':
        return '#E6DEFF'; // surface.action.faded
      case 'white':
        return '#FFFFFF'; // surface.primary
      case 'other':
      default:
        return '#EBEBEB'; // surface.other
    }
  };

  const getHoverBgColor = () => {
    if (disabled) return getBgColor();
    
    switch (variant) {
      case 'primary':
        return '#5841D0'; // surface.action.hover
      case 'secondary':
        return '#D4C6FF'; // surface.action.faded.hover
      case 'white':
        return '#F5F5F5'; // surface.primary.hover
      case 'other':
      default:
        return '#E1E1E1'; // surface.other.hover
    }
  };

  const getTextColor = () => {
    if (disabled) return '#A1A1A1'; // dark.tertiary
    
    switch (variant) {
      case 'primary':
        return '#FFFFFF'; // light.primary
      case 'secondary':
        return '#6B4EFF'; // action
      case 'white':
        return '#333333'; // dark.primary
      case 'other':
      default:
        return '#666666'; // dark.secondary
    }
  };

  const getBorderColor = () => {
    if (disabled) return 'transparent';
    
    switch (variant) {
      case 'primary':
        return 'transparent';
      case 'secondary':
        return '#6B4EFF'; // action
      default:
        return '#333333'; // dark
    }
  };

  const getPadding = () => {
    return size === 'md' ? '0.25rem 0.5rem' : '0.25rem 0.75rem';
  };

  const getIconSize = () => {
    return size === 'md' ? '1rem' : '1.25rem';
  };

  const getFontSize = () => {
    return size === 'md' ? '0.75rem' : '0.875rem';
  };

  const showAvatar = !!avatarSrc && size === 'lg';
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClick) onClick();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClose) onClose();
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        padding: getPadding(),
        backgroundColor: getBgColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '0.25rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {showAvatar && (
          <div
            style={{
              width: getIconSize(),
              height: getIconSize(),
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img 
              src={avatarSrc} 
              alt={text}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        {icon && !showAvatar && (
          <span
            style={{
              fontSize: getIconSize(),
              color: getTextColor(),
            }}
          >
            {/* Display an icon placeholder */}
            ●
          </span>
        )}
        <span
          style={{
            whiteSpace: 'nowrap',
            fontSize: getFontSize(),
            fontWeight: 600,
            color: getTextColor(),
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontSize: getIconSize(),
            color: getTextColor(),
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          onClick={handleClose}
        >
          ✕
        </span>
      </div>
    </div>
  );
};

export default Tag; 