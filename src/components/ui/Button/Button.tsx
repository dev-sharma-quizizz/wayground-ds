import React, { forwardRef } from 'react';
import Flex from '../../layouts/Flex/Flex';
import Floating from '../../layouts/Floating/Floating';
import Icon from '../Icon/Icon';
// PremiumIcon is not yet converted, we'll comment out its usage for now
// import PremiumIcon from '../PremiumIcon/PremiumIcon';
import Text from '../../primitive/Text/Text';
import Box from '../../primitive/Box/Box';
import { SuperNotAllowedVariants } from './types';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title = 'Button',
      size = 'md',
      variant = 'primary',
      lIcon,
      lIconType = 'solid',
      tIcon,
      tIconType = 'solid',
      disabled = false,
      isSuper = false,
      superVariant = 'superBox',
      loading = false,
      fullWidth = false,
      maxLength = -1,
      type = 'button',
      ariaLabel,
      dataTestid,
      onClick,
    },
    ref
  ) => {
    // Since we're having issues with text and color props, let's use style for now
    const buttonStyle: React.CSSProperties = {
      padding: size === 'sm' ? '0.5rem' : size === 'md' ? '0.75rem' : '1rem',
      minHeight: size === 'sm' ? '2rem' : size === 'md' ? '2.5rem' : '3rem',
      minWidth: '5rem',
      backgroundColor: variant === 'primary' ? '#6B4EFF' : 
                      variant === 'secondary' ? '#FFFFFF' :
                      variant === 'danger' ? '#FF5151' : 
                      variant === 'outline' ? 'transparent' : '#F0F0F0',
      color: variant === 'primary' || variant === 'danger' ? 'white' : 
            variant === 'outline' ? '#6B4EFF' : '#333333',
      border: variant === 'outline' ? '1px solid #333333' : 'none',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      fontSize: size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.125rem',
      fontWeight: 600,
      transition: 'all 0.2s',
    };

    // This will override hover styles if we need them
    const hoverStyle: React.CSSProperties = {
      backgroundColor: variant === 'primary' ? '#5D43E5' : 
                      variant === 'secondary' ? '#F5F5F5' :
                      variant === 'danger' ? '#E54545' : 
                      variant === 'outline' ? 'rgba(107, 78, 255, 0.1)' : '#E5E5E5',
    };

    const iconSize = size === 'sm' ? '3' : size === 'md' ? '4' : '5';
    const iconColor = variant === 'primary' || variant === 'danger' ? 'light' : 'dark';
    
    // Re-add the shouldShowSuperIcon variable
    const shouldShowSuperIcon = !SuperNotAllowedVariants.includes(variant) && isSuper;

    const buttonTitle = maxLength > 0
      ? title.length > maxLength
        ? `${title.slice(0, maxLength)}..`
        : title
      : title;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel || title}
        style={buttonStyle}
        disabled={disabled}
        data-testid={dataTestid}
        onClick={handleClick}
      >
        {loading && (
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="spinner" style={{ 
              display: 'inline-block', 
              width: '1rem', 
              height: '1rem', 
              borderRadius: '50%', 
              border: `2px solid ${iconColor === 'light' ? 'white' : '#333'}`,
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite'
            }}></span>
          </div>
        )}
        <div style={{ visibility: loading ? 'hidden' : 'visible', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {lIcon && (
            <span className="icon" aria-hidden="true" style={{ marginRight: '0.25rem' }}>
              {/* Icon would go here */}
              {lIcon}
            </span>
          )}
          <span>{buttonTitle}</span>
          {tIcon && !isSuper && (
            <span className="icon" aria-hidden="true" style={{ marginLeft: '0.25rem' }}>
              {/* Icon would go here */}
              {tIcon}
            </span>
          )}
          {shouldShowSuperIcon && (
            <span className="premium-icon" aria-hidden="true" style={{ marginLeft: '0.25rem' }}>
              {/* Premium icon would go here */}
              ⭐
            </span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

// Add some CSS for the spinner animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Button; 