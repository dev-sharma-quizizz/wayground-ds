import React, { useEffect, useState, CSSProperties } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Flex from '../../layouts/Flex/Flex';

export interface CircularProgressProps {
  loaderPercentage?: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentWithProgress?: boolean;
  strokeVariant?: 'primary' | 'fail' | 'success' | 'warn';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  loaderPercentage = 0,
  size = 'lg',
  showPercentWithProgress = false,
  strokeVariant = 'primary',
}) => {
  const { theme, device } = useTheme();
  const [strokeColor, setStrokeColor] = useState('#E5E5E5');
  const [percentage, setPercentage] = useState(0);
  const strokeWidth = 4;
  const fillColor = 'transparent';

  // Validate props
  useEffect(() => {
    if (loaderPercentage < 0 || loaderPercentage > 100) {
      console.error('loaderPercentage should be between 0 and 100');
    }
  }, [loaderPercentage]);

  // Set stroke color based on variant
  useEffect(() => {
    const getStrokeColor = () => {
      switch (strokeVariant) {
        case 'primary':
          return '#8854C0';
        case 'fail':
          return '#D9003B';
        case 'success':
          return '#02AD71';
        case 'warn':
          return '#E57C19';
        default:
          return '#8854C0';
      }
    };
    
    setStrokeColor(getStrokeColor());
  }, [strokeVariant]);

  // Animate percentage
  useEffect(() => {
    setPercentage(loaderPercentage);
  }, [loaderPercentage]);

  const getDimensions = () => {
    if (device === 'mobile') {
      switch (size) {
        case 'sm': return 20;
        case 'md': return 30;
        case 'lg': return 40;
        default: return 40;
      }
    } else {
      switch (size) {
        case 'sm': return 24;
        case 'md': return 36;
        case 'lg': return 48;
        default: return 48;
      }
    }
  };

  const heightWidth = getDimensions();
  const radius = (heightWidth - strokeWidth) / 2;
  const circumference = Math.floor(2 * Math.PI * radius);
  const strokeDasharray = `${circumference}px`;
  const strokeDashoffset = `${circumference - ((percentage * circumference) / 100)}px`;

  const containerStyle: CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    textAlign: 'center',
    height: `${heightWidth}px`,
    width: `${heightWidth}px`,
  };

  const figCaptionStyle: CSSProperties = {
    width: `${heightWidth - strokeWidth * 2}px`,
    height: `${heightWidth - strokeWidth * 2}px`,
    border: `${strokeWidth}px solid #E5E5E5`,
    borderRadius: '50%',
    boxSizing: 'content-box',
  };

  const labelStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
  };

  return (
    <Flex justify="center" align="center">
      <figure style={containerStyle} data-percent={percentage || 0}>
        <figcaption style={figCaptionStyle} />
        
        {showPercentWithProgress && size === 'lg' && (
          <div style={labelStyle}>
            {percentage || 0}%
          </div>
        )}
        
        <svg
          className="progress-svg"
          style={{ position: 'absolute', top: 0, left: 0 }}
          width={heightWidth}
          height={heightWidth}
        >
          <circle
            data-testid="circle"
            className="outer"
            cx={heightWidth / 2}
            cy={heightWidth / 2}
            r={radius}
            transform={`rotate(-90, ${heightWidth / 2}, ${heightWidth / 2})`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 500ms ease-in-out' }}
          />
        </svg>
      </figure>
    </Flex>
  );
};

export default CircularProgress; 