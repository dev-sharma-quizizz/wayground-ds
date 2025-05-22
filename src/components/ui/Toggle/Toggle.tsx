import React from 'react';
import FixedSize from '../../layouts/FixedSize/FixedSize';
import VisuallyHidden from '../../primitives/VisuallyHidden/VisuallyHidden';
import Flex from '../../layouts/Flex/Flex';
import Text from '../../primitive/Text/Text';
import { useTheme } from '../../../hooks/useTheme';
import type { AlignItems, JustifyContent } from '../../../types';

export interface ToggleProps {
  disabled?: boolean;
  label?: string;
  labelPosition?: 'prefix' | 'suffix';
  name: string;
  ariaLabel: string;
  dataTestid?: string;
  fullWidth?: boolean;
  justify?: JustifyContent;
  align?: AlignItems;
  active: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent, active: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  disabled = false,
  label,
  labelPosition = 'prefix',
  name,
  ariaLabel,
  dataTestid,
  fullWidth,
  justify,
  align,
  active,
  onChange
}) => {
  const { theme, device, corporateBranding } = useTheme();
  
  const getToggleBgColor = () => {
    if (theme === 'admin') {
      if (disabled) return 'surface.disabled';
      return active ? 'surface.success' : 'surface.other.hover';
    } else {
      if (disabled) return 'immersive.surface.altSecondary.disabled';
      if (active) {
        return !corporateBranding ? 'immersive.surface.action' : 'immersive.surface.override';
      }
      return 'immersive.surface.altSecondary';
    }
  };

  const getToggleHoverBgColor = () => {
    if (theme === 'admin') {
      if (active) {
        return disabled ? 'surface.other.hover' : 'surface.success.hover';
      }
      return 'surface.other.hover';
    } else {
      if (disabled) return 'immersive.surface.altSecondary.disabled';
      if (active) {
        return !corporateBranding ? 'immersive.surface.action.hover' : 'immersive.surface.override.hover';
      }
      return 'immersive.surface.altSecondary.hover';
    }
  };

  const getToggleActiveBgColor = () => {
    if (theme === 'admin') {
      if (active) {
        return disabled ? 'surface.other.pressed' : 'surface.success.pressed';
      }
      return 'surface.other.pressed';
    } else {
      if (disabled) return 'immersive.surface.altSecondary.disabled';
      if (active) {
        return !corporateBranding ? 'immersive.surface.action.pressed' : 'immersive.surface.override.pressed';
      }
      return 'immersive.surface.altSecondary.pressed';
    }
  };

  const getKnobBgColor = () => {
    if (theme === 'admin') {
      return disabled ? 'surface.other.pressed' : 'surface.primary';
    } else {
      return disabled ? 'immersive.surface.altTertiary' : 'immersive.surface.altPrimary';
    }
  };

  const getTextColor = () => {
    if (theme === 'admin') {
      return disabled ? 'dark.tertiary' : 'dark.primary';
    } else {
      return disabled ? 'immersive.tertiary' : 'immersive.primary';
    }
  };

  const getTextVariant = () => {
    if (device === 'desktop') {
      return theme === 'admin' ? 'content.small.bold' : 'content.small.bold';
    } else {
      return theme === 'admin' ? 'content.base.bold' : 'content.base.bold';
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    
    onChange?.(event, !active);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || event.key !== 'Enter') {
      return;
    }
    
    onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>, !active);
  };

  const labelId = `${name}-label`;

  return (
    <Flex align={align} direction="row" gap="2" justify={justify} fullWidth={fullWidth}>
      {label && labelPosition === 'prefix' && (
        <label id={labelId} data-testid="prefix-label">
          <Text
            textVariant={getTextVariant()}
            as="span"
          >
            {label}
          </Text>
        </label>
      )}
      <div onClick={handleClick} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <FixedSize
          data-testid="toggle"
          width="10" 
          height="5" 
          bgColor={getToggleBgColor()}
          hoverBgColor={getToggleHoverBgColor()}
          activeBgColor={getToggleActiveBgColor()}
          padding="0.5"
          cursor="pointer"
          rounded="full"
          groupHoverBgColor={getToggleHoverBgColor()}
          groupActiveBgColor={getToggleActiveBgColor()}
          className="focus-within:ring-offset-2 focus-within:ring-4 focus-within:ring-ds-lilac-500-40"
        >
          <FixedSize
            data-testid="toggle-knob"
            width="4" 
            height="4" 
            className={`transition-transform ${active ? 'translate-x-5' : ''}`}
            bgColor={getKnobBgColor()}
            rounded="full"
          />
          <VisuallyHidden>
            <input 
              type="checkbox" 
              disabled={disabled} 
              data-testid={dataTestid} 
              checked={active} 
              aria-checked={active} 
              aria-labelledby={labelId} 
              aria-label={ariaLabel} 
              onKeyUp={handleKeyUp}
            />
          </VisuallyHidden>
        </FixedSize>
      </div>
      {label && labelPosition === 'suffix' && (
        <label id={labelId} data-testid="suffix-label">
          <Text
            textVariant={getTextVariant()}
            as="span"
          >
            {label}
          </Text>
        </label>
      )}
    </Flex>
  );
};

export default Toggle; 