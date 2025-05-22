import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

export type PillVariant = 'action' | 'info' | 'success' | 'warn' | 'fail' | 'super' | 'neutral' | 'dark' | 'primary' | 'secondary';
export type PillSize = 'sm' | 'md';
export type PillType = 'primary' | 'secondary';

export interface PillProps {
  size?: PillSize;
  type?: PillType;
  variant?: PillVariant;
  disabled?: boolean;
  title: string;
  maxLength?: number;
  icon?: string;
  iconType?: string;
  iconAnimate?: boolean;
  dataTestid?: string;
}

export const Pill: React.FC<PillProps> = ({
  size = 'md',
  type = 'primary',
  variant = 'action',
  disabled = false,
  title = 'Pill',
  maxLength = -1,
  icon,
  iconType,
  iconAnimate,
  dataTestid,
}) => {
  const { theme, device } = useTheme();

  const getPadding = () => {
    return size === 'md' ? '0.25rem 0.75rem' : '0 0.5rem';
  };

  const getFontSize = () => {
    if (device === 'mobile') {
      return size === 'sm' ? '0.75rem' : '0.875rem';
    }
    return size === 'sm' ? '0.75rem' : '0.875rem';
  };

  const getBgColor = () => {
    if (disabled) {
      return '#F0F0F0'; // surface.disabled
    }

    if (type === 'primary') {
      switch (variant) {
        case 'action':
          return '#6B4EFF'; // surface.action
        case 'info':
          return '#0096FF'; // surface.info
        case 'success':
          return '#02AD71'; // surface.success
        case 'warn':
          return '#E57C19'; // surface.warn
        case 'fail':
          return '#D9003B'; // surface.fail
        case 'super':
          return '#FFD600'; // surface.super
        case 'neutral':
          return '#FFFFFF'; // surface.primary
        case 'dark':
          return 'rgba(0, 0, 0, 0.8)'; // surface.overlay.dark
        default:
          return '#6B4EFF'; // surface.action
      }
    } else {
      switch (variant) {
        case 'action':
          return '#E6DEFF'; // surface.action.faded
        case 'info':
          return '#E6F4FF'; // surface.info.faded
        case 'success':
          return '#E6F9F1'; // surface.success.faded
        case 'warn':
          return '#FFF4E5'; // surface.warn.faded
        case 'fail':
          return '#FFE6ED'; // surface.fail.faded
        case 'super':
          return '#FFFCE6'; // surface.super.faded
        case 'neutral':
          return '#EBEBEB'; // surface.other
        case 'dark':
          return 'rgba(0, 0, 0, 0.8)'; // surface.overlay.dark
        case 'secondary':
          return '#EBEBEB'; // surface.other
        default:
          return '#E6DEFF'; // surface.action.faded
      }
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return '#A1A1A1'; // dark.tertiary
    }

    if (type === 'primary') {
      switch (variant) {
        case 'super':
        case 'neutral':
          return '#333333'; // dark.primary
        default:
          return '#FFFFFF'; // light.primary
      }
    } else {
      switch (variant) {
        case 'action':
          return '#6B4EFF'; // action
        case 'info':
          return '#0096FF'; // info
        case 'success':
          return '#02AD71'; // success
        case 'warn':
          return '#E57C19'; // warn
        case 'fail':
          return '#D9003B'; // fail
        case 'super':
          return '#333333'; // dark.primary
        case 'neutral':
          return '#666666'; // dark.secondary
        case 'dark':
          return '#FFFFFF'; // light.primary
        default:
          return '#6B4EFF'; // action
      }
    }
  };

  const getBorderColor = () => {
    if (disabled) {
      return 'transparent';
    }

    if (type === 'primary') {
      switch (variant) {
        case 'neutral':
          return '#333333'; // dark
        case 'dark':
          return '#FFFFFF'; // light
        default:
          return 'transparent';
      }
    } else {
      switch (variant) {
        case 'action':
          return '#6B4EFF'; // action
        case 'info':
          return '#0096FF'; // info
        case 'success':
          return '#02AD71'; // success
        case 'warn':
          return '#E57C19'; // warn
        case 'fail':
          return '#D9003B'; // fail
        case 'super':
          return '#FFD600'; // super
        case 'neutral':
          return '#333333'; // dark
        case 'dark':
          return '#FFFFFF'; // light
        default:
          return '#6B4EFF'; // action
      }
    }
  };

  const getIconSize = () => {
    return size === 'sm' ? '12px' : '16px';
  };

  const truncateText = (text: string, maxLen: number) => {
    if (maxLen > 0 && text.length > maxLen) {
      return `${text.slice(0, maxLen)}..`;
    }
    return text;
  };

  const pillText = truncateText(title, maxLength);

  return (
    <div
      data-testid={dataTestid}
      style={{
        display: 'inline-block',
        padding: getPadding(),
        backgroundColor: getBgColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '9999px',
        maxWidth: 'max-content',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: getFontSize(),
          fontWeight: 600,
          color: getTextColor(),
        }}
      >
        {icon && (
          <span
            style={{
              fontSize: getIconSize(),
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Using a placeholder for the icon */}
            ●
          </span>
        )}
        {pillText}
      </div>
    </div>
  );
};

export default Pill; 