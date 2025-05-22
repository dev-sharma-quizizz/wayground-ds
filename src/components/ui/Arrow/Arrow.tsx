import React from 'react';

export interface ArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const Arrow: React.FC<ArrowProps> = ({
  direction = 'down',
}) => {
  const getPositionClass = () => {
    switch (direction) {
      case 'up':
        return { bottom: 0, left: '1px' };
      case 'down':
        return { top: 0, left: '1px' };
      case 'left':
        return { right: 0, top: '1px' };
      case 'right':
        return { left: 0, top: '1px' };
      default:
        return {};
    }
  };

  const getArrowStyles = () => {
    const baseStyle = {
      width: 0,
      height: 0,
      position: 'absolute' as const,
      ...getPositionClass(),
    };

    switch (direction) {
      case 'up':
        return {
          ...baseStyle,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '12px solid white',
        };
      case 'down':
        return {
          ...baseStyle,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '12px solid white',
        };
      case 'right':
        return {
          ...baseStyle,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderLeft: '12px solid white',
        };
      case 'left':
        return {
          ...baseStyle,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderRight: '12px solid white',
        };
      default:
        return baseStyle;
    }
  };

  const getBorderStyles = () => {
    const baseStyle = {
      width: 0,
      height: 0,
      position: 'absolute' as const,
    };

    switch (direction) {
      case 'up':
        return {
          ...baseStyle,
          borderLeft: '13px solid transparent',
          borderRight: '13px solid transparent',
          borderBottom: '13px solid rgba(9, 9, 9, 0.2)',
        };
      case 'down':
        return {
          ...baseStyle,
          borderLeft: '13px solid transparent',
          borderRight: '13px solid transparent',
          borderTop: '13px solid rgba(9, 9, 9, 0.2)',
        };
      case 'right':
        return {
          ...baseStyle,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderLeft: '13px solid rgba(9, 9, 9, 0.2)',
        };
      case 'left':
        return {
          ...baseStyle,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderRight: '13px solid rgba(9, 9, 9, 0.2)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={getArrowStyles()} data-testid={`arrow-${direction}`} />
      <div style={getBorderStyles()} data-testid={`arrow-${direction}-border`} />
    </div>
  );
};

export default Arrow; 