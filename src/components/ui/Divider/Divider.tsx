import React from 'react';
import Flex from '../../layouts/Flex/Flex';
import { useTheme } from '../../../hooks/useTheme';

export interface DividerProps {
  variant?: 'dark.low-contrast' | 'dark.high-contrast' | 'light.low-contrast' | 'light.high-contrast';
  orientation?: 'horizontal' | 'vertical';
  id?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'dark.low-contrast',
  orientation = 'horizontal',
  id,
}) => {
  const { theme } = useTheme();
  
  const getBorderColor = () => {
    switch (variant) {
      case 'dark.low-contrast':
        return 'dark';
      case 'dark.high-contrast':
        return 'dark.high-contrast';
      case 'light.low-contrast':
        return 'light';
      case 'light.high-contrast':
        return 'light.high-contrast';
      default:
        return 'dark';
    }
  };

  const getBorderPosition = () => {
    return orientation === 'horizontal' ? 'bottom' : 'right';
  };

  return (
    <div id={id}>
      <Flex
        fullHeight={orientation === 'vertical'}
        fullWidth={orientation === 'horizontal'}
        dataTestid={`divider-${orientation}`}
        borderSize="1"
        borderPosition={getBorderPosition()}
        borderColor={getBorderColor()}
      />
    </div>
  );
};

export default Divider; 