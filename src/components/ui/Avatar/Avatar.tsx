import React from 'react';
import FixedSize from '../../layouts/FixedSize/FixedSize';

export type AvatarSize = '4' | '5' | '6' | '8' | '10' | '12' | '14' | '16' | '18' | '20' | '24' | '30' | '40';
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type IconSize = '3' | '4' | '5' | '6' | '8' | '10' | '12' | '14';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  objectFit?: ObjectFit;
  interactive?: boolean;
  icon?: string;
  iconSize?: IconSize;
  shrink?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src = 'https://cf.quizizz.com/img/avatar-default.png',
  alt,
  size = '10',
  objectFit = 'cover',
  interactive = false,
  icon,
  iconSize = '10',
  shrink,
  onClick,
}) => {
  // Avatar is rendered as a fixed size container with an image inside
  // For now, since we might have issues with the interactive image component,
  // we'll implement it with simple HTML elements
  
  const handleClick = (ev: React.MouseEvent) => {
    if (interactive && onClick) {
      onClick(ev);
    }
  };

  return (
    <FixedSize 
      shrink={shrink} 
      relative={true} 
      size={size} 
      bgColor="surface.secondary" 
      border="1 dark" 
      rounded="full"
      overflow="hidden"
    >
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          cursor: interactive ? 'pointer' : 'default',
        }} 
        onClick={handleClick}
      >
        <img 
          src={src} 
          alt={alt} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit 
          }} 
        />
        {interactive && icon && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '30%',
            height: '30%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: 'white',
            fontSize: `${parseInt(iconSize) * 0.1}rem`,
          }}>
            {/* Represent the icon with text (would be replaced with proper Icon component) */}
            {icon === 'edit' ? '✏️' : '⚙️'}
          </div>
        )}
      </div>
    </FixedSize>
  );
};

export default Avatar; 