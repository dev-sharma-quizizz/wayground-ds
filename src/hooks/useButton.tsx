import { useTheme } from './useTheme';

type ButtonType = 'Button' | 'IconButton' | 'ShadowButton';
type ButtonVariant =
  'primary'
  | 'secondary'
  | 'tertiary'
  | 'other'
  | 'outline'
  | 'danger'
  | 'super'
  | 'link'
  | 'link-action'
  | 'link-dark'
  | 'link-light'
  | 'override';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  isSuper?: boolean;
}

/**
 * React hook that calculates button styling based on theme, variant, and state
 */
const useButton = (buttonType: ButtonType, props: ButtonProps) => {
  const { theme, device } = useTheme();
  const { size = 'md', variant = 'primary', disabled = false, isSuper = false } = props;

  // Calculate background colors
  let bgColor = '';
  let hoverBgColor = '';
  let activeBgColor = '';
  let borderColor = '';
  let borderColorIconButton = '';
  let textColor = '';
  let iconSize = '';
  let iconButtonSize = '';
  let buttonHeight = '';
  let shadowButtonHeight = '';
  let shadowButtonRounded = '';

  // Set colors based on theme and variant
  if (theme === 'admin') {
    if (disabled) {
      bgColor = 'var(--surface-disabled)';
      textColor = 'var(--text-dark-tertiary)';
    } else {
      // Set background color
      switch (variant) {
        case 'primary':
          bgColor = 'var(--surface-action)';
          hoverBgColor = 'var(--surface-action-hover)';
          activeBgColor = 'var(--surface-action-pressed)';
          textColor = 'var(--text-light-primary)';
          break;
        case 'secondary':
          bgColor = 'var(--surface-action-faded)';
          hoverBgColor = 'var(--surface-action-faded-hover)';
          activeBgColor = 'var(--surface-action-faded-pressed)';
          textColor = 'var(--text-action)';
          break;
        case 'tertiary':
          bgColor = 'var(--surface-other)';
          hoverBgColor = 'var(--surface-other-hover)';
          activeBgColor = 'var(--surface-other-pressed)';
          textColor = 'var(--text-dark-primary)';
          break;
        case 'outline':
          bgColor = 'transparent';
          hoverBgColor = 'var(--surface-other-hover)';
          activeBgColor = 'var(--surface-other-pressed)';
          textColor = 'var(--text-dark-primary)';
          borderColor = 'var(--border-dark)';
          borderColorIconButton = 'var(--border-dark)';
          break;
        case 'danger':
          bgColor = 'var(--surface-fail)';
          hoverBgColor = 'var(--surface-fail-hover)';
          activeBgColor = 'var(--surface-fail-pressed)';
          textColor = 'var(--text-light-primary)';
          borderColorIconButton = 'var(--border-fail)';
          break;
        case 'super':
          bgColor = 'var(--surface-super)';
          hoverBgColor = 'var(--surface-super-hover)';
          activeBgColor = 'var(--surface-super-pressed)';
          textColor = 'var(--text-dark-primary)';
          break;
        case 'link-action':
          bgColor = 'transparent';
          hoverBgColor = 'var(--surface-other-hover)';
          activeBgColor = 'var(--surface-other-pressed)';
          textColor = 'var(--text-action)';
          break;
        case 'link-dark':
          bgColor = 'transparent';
          hoverBgColor = 'var(--surface-other-hover)';
          activeBgColor = 'var(--surface-other-pressed)';
          textColor = 'var(--text-dark-secondary)';
          break;
        case 'link-light':
          bgColor = 'transparent';
          hoverBgColor = 'var(--surface-other-hover)';
          activeBgColor = 'var(--surface-other-pressed)';
          textColor = 'var(--text-light-primary)';
          break;
        case 'other':
        default:
          bgColor = 'var(--surface-primary)';
          hoverBgColor = 'var(--surface-primary-hover)';
          activeBgColor = 'var(--surface-primary-pressed)';
          textColor = 'var(--text-dark-primary)';
          break;
      }
    }

    // Set size-based values
    if (buttonType === 'IconButton') {
      switch (size) {
        case 'sm':
          iconButtonSize = '32px';
          iconSize = '3';
          break;
        case 'md':
          iconButtonSize = '40px';
          iconSize = '4';
          break;
        case 'lg':
          iconButtonSize = '48px';
          iconSize = '5';
          break;
        default:
          iconButtonSize = '40px';
          iconSize = '4';
          break;
      }
    } else if (buttonType === 'Button') {
      switch (size) {
        case 'sm':
          buttonHeight = '24px';
          iconSize = '3';
          break;
        case 'md':
          buttonHeight = '32px';
          iconSize = '4';
          break;
        case 'lg':
          buttonHeight = '40px';
          iconSize = '5';
          break;
        default:
          buttonHeight = '32px';
          iconSize = '4';
          break;
      }
    } else if (buttonType === 'ShadowButton') {
      shadowButtonHeight = '48px';
      shadowButtonRounded = '0.5rem'; // lg
    }
  } else if (theme === 'immersive') {
    // Immersive theme styles
    if (disabled) {
      bgColor = variant === 'primary'
        ? 'var(--immersive-surface-altPrimary-disabled)'
        : 'var(--immersive-surface-altSecondary-disabled)';
      textColor = 'var(--immersive-text-tertiary)';
    } else {
      switch (variant) {
        case 'primary':
          bgColor = 'var(--immersive-surface-altPrimary)';
          hoverBgColor = 'var(--immersive-surface-altPrimary-hover)';
          activeBgColor = 'var(--immersive-surface-altPrimary-pressed)';
          textColor = 'var(--immersive-text-altPrimary)';
          break;
        case 'secondary':
          bgColor = 'var(--immersive-surface-altSecondary)';
          hoverBgColor = 'var(--immersive-surface-altSecondary-hover)';
          activeBgColor = 'var(--immersive-surface-altSecondary-pressed)';
          textColor = 'var(--immersive-text-primary)';
          break;
        case 'danger':
          bgColor = 'var(--immersive-surface-fail)';
          hoverBgColor = 'var(--immersive-surface-fail-hover)';
          activeBgColor = 'var(--immersive-surface-fail-pressed)';
          textColor = 'var(--immersive-text-primary)';
          break;
        case 'link':
          bgColor = 'transparent';
          textColor = 'var(--immersive-text-primary)';
          break;
        case 'override':
          bgColor = 'var(--immersive-surface-override)';
          hoverBgColor = 'var(--immersive-surface-override-hover)';
          activeBgColor = 'var(--immersive-surface-override-pressed)';
          textColor = 'var(--immersive-text-override)';
          break;
        case 'other':
        default:
          bgColor = 'var(--immersive-surface-action)';
          hoverBgColor = 'var(--immersive-surface-action-hover)';
          activeBgColor = 'var(--immersive-surface-action-pressed)';
          textColor = 'var(--immersive-text-primary)';
          break;
      }
    }

    // Set size-based values for immersive theme
    if (buttonType === 'IconButton') {
      switch (size) {
        case 'sm':
          iconButtonSize = '16px';
          iconSize = '3';
          break;
        case 'md':
          iconButtonSize = '20px';
          iconSize = '4';
          break;
        case 'lg':
          iconButtonSize = '24px';
          iconSize = '5';
          break;
        default:
          iconButtonSize = '20px';
          iconSize = '4';
          break;
      }
    } else if (buttonType === 'ShadowButton') {
      shadowButtonHeight = 'auto';
      shadowButtonRounded = '0.25rem'; // base
    }
  }

  return {
    bgColor,
    hoverBgColor,
    activeBgColor,
    borderColor,
    borderColorIconButton,
    textColor,
    iconSize,
    iconButtonSize,
    buttonHeight,
    shadowButtonHeight,
    shadowButtonRounded,
  };
};

export default useButton;
