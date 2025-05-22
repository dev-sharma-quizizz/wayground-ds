import React, { forwardRef, MouseEvent } from 'react';
import Icon, { IconType } from '../Icon/Icon';
import Floating from '../../layouts/Floating/Floating';
import Flex from '../../layouts/Flex/Flex';
import useButton from '../../../hooks/useButton';

// For validation
const SuperNotAllowedVariants = ['submit', 'reset'];

export interface IconButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'other' | 'outline' | 'danger' | 'super' | 'link-action' | 'link-dark' | 'link-light';
  icon?: string;
  iconType?: IconType;
  disabled?: boolean;
  isSuper?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  dataTestid?: string;
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/**
 * Icon Button component that displays an icon in a button
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  size = 'md',
  variant = 'primary',
  icon = 'arrow-right',
  iconType = 'solid',
  disabled = false,
  isSuper = false,
  loading = false,
  type = 'button',
  dataTestid = 'icon-button',
  ariaLabel,
  onClick,
  className = '',
}, ref) => {
  // Get button styling from hook
  const {
    bgColor,
    hoverBgColor,
    activeBgColor,
    borderColorIconButton,
    textColor,
    iconSize,
    iconButtonSize
  } = useButton('IconButton', { size, variant, disabled, isSuper });

  // Determine CSS classes based on state
  const getClasses = () => {
    const baseClasses = [
      'relative',
      'rounded',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'focus-visible:outline',
      'focus-visible:outline-4',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-ds-lilac-500-40',
      'shrink-0',
    ];

    if (disabled) {
      baseClasses.push('cursor-not-allowed', 'pointer-events-none');
    }

    if (isSuper) {
      baseClasses.push('relative');
    }

    if (loading) {
      baseClasses.push('relative', 'pointer-events-none');
    }

    // Add any custom classes
    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(' ');
  };

  // Determine style properties
  const getStyles = () => {
    if (disabled) {
      return {
        backgroundColor: bgColor,
        width: iconButtonSize,
        height: iconButtonSize,
      };
    }

    return {
      backgroundColor: bgColor,
      ":hover": {
        backgroundColor: hoverBgColor
      },
      ":active": {
        backgroundColor: activeBgColor
      },
      width: iconButtonSize,
      height: iconButtonSize,
      borderColor: borderColorIconButton,
      borderWidth: '1px',
    };
  };

  // Check if should show super icon
  const shouldShowSuperIcon = !SuperNotAllowedVariants.includes(type) && isSuper;

  // Handle click event
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel || icon}
      className={getClasses()}
      style={getStyles() as React.CSSProperties}
      data-testid={dataTestid}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading && (
        <Floating position="center">
          <Icon
            type="regular"
            name="sync"
            color={textColor}
            size={iconSize}
            fixedWidth={false}
            animate="spin"
          />
        </Floating>
      )}

      <Flex align="center" justify="center" fullHeight visibility={loading ? 'invisible' : 'visible'}>
        <Icon
          type={iconType}
          name={icon}
          size={iconSize}
          color={textColor}
        />
      </Flex>

      {shouldShowSuperIcon && (
        <Floating
          position="top-right"
          bgColor="surface.super.faded"
          border="1 super"
          rounded="base"
        >
          <Icon type="solid" name="bolt-lightning" size="4" color="super" />
        </Floating>
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton; 