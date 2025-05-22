import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Flex from '../../layouts/Flex/Flex';
import FixedSize from '../../layouts/FixedSize/FixedSize';

export interface CheckboxProps {
  size?: 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  title?: string;
  type?: 'prefix' | 'suffix';
  name: string;
  dataTestid?: string;
  onChange?: (checked: boolean, event: React.MouseEvent) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 'md',
  disabled = false,
  checked: controlledChecked,
  defaultChecked = false,
  title = '',
  type = 'prefix',
  name,
  dataTestid,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const { theme, device } = useTheme();

  // Handle controlled component
  useEffect(() => {
    if (controlledChecked !== undefined) {
      setInternalChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const getControlSize = () => {
    return size === 'md' ? '4' : '5';
  };

  const getBorderColor = () => {
    return isChecked ? 'transparent' : 'dark.high-contrast';
  };

  const getFontSize = () => {
    if (device === 'mobile') {
      return size === 'md' ? '1rem' : '1.125rem';
    }
    return size === 'md' ? '0.875rem' : '1rem';
  };

  const getBgColor = () => {
    if (disabled) {
      return 'surface.disabled';
    }
    return isChecked ? 'surface.action' : 'surface.primary';
  };

  const getTextColor = () => {
    return disabled ? '#A1A1A1' : '#333333';
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    const newState = !isChecked;
    setInternalChecked(newState);
    
    if (onChange) {
      onChange(newState, e);
    }
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleClick}>
      <Flex align="start" gap="2">
        {type === 'suffix' && title && (
          <div style={{ 
            fontSize: getFontSize(),
            fontWeight: 500,
            color: getTextColor()
          }}>
            <label htmlFor={name}>{title}</label>
          </div>
        )}
        <FixedSize
          shrink={false}
          size={getControlSize()}
          borderSize={isChecked ? '0' : '1'}
          borderColor={getBorderColor()}
          rounded="base"
          bgColor={getBgColor()}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            {isChecked && (
              <span style={{ 
                color: 'white',
                fontSize: size === 'md' ? '14px' : '18px',
                lineHeight: 1
              }}>
                ✓
              </span>
            )}
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={isChecked}
              data-testid={dataTestid}
              style={{ 
                position: 'absolute',
                opacity: 0,
                width: '100%',
                height: '100%',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
              onChange={() => {}}
            />
          </div>
        </FixedSize>
        {type === 'prefix' && title && (
          <div style={{ 
            fontSize: getFontSize(),
            fontWeight: 500,
            color: getTextColor()
          }}>
            <label htmlFor={name}>{title}</label>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Checkbox; 