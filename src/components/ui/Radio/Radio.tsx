import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Flex from '../../layouts/Flex/Flex';
import FixedSize from '../../layouts/FixedSize/FixedSize';

export interface RadioProps {
  name: string;
  value: string;
  checked?: boolean;
  size?: 'md' | 'lg';
  disabled?: boolean;
  title?: string;
  onChange?: (value: string) => void;
  dataTestid?: string;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  checked = false,
  size = 'md',
  disabled = false,
  title,
  onChange,
  dataTestid,
}) => {
  const { theme, device } = useTheme();

  const getControlSize = () => {
    return size === 'md' ? '4' : '5';
  };

  const getBorderColor = () => {
    return checked ? 'action.solid' : 'dark.high-contrast';
  };

  const getTextColor = () => {
    return disabled ? '#A1A1A1' : '#333333';
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
    return 'surface.primary';
  };

  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex align="center" gap="2">
      <div 
        style={{ 
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onClick={handleClick}
        data-testid={dataTestid}
      >
        <FixedSize
          size={getControlSize()}
          borderSize={checked ? '2' : '1'}
          borderColor={getBorderColor()}
          bgColor={getBgColor()}
          rounded="full"
          shrink={false}
        >
          {checked && (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <div style={{ 
                width: size === 'md' ? '8px' : '12px', 
                height: size === 'md' ? '8px' : '12px', 
                backgroundColor: '#6B4EFF', 
                borderRadius: '50%' 
              }} />
            </div>
          )}
          <input
            id={`${name}-${value}`}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleClick}
            style={{ 
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          />
        </FixedSize>
        {title && (
          <label 
            htmlFor={`${name}-${value}`}
            style={{
              fontSize: getFontSize(),
              fontWeight: 500,
              color: getTextColor(),
              textAlign: 'left',
            }}
          >
            {title}
          </label>
        )}
      </div>
    </Flex>
  );
};

export default Radio; 