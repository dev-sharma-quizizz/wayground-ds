import React, { useEffect, useRef } from 'react';
import Absolute from '../../layouts/Absolute/Absolute';
import Flex from '../../layouts/Flex/Flex';
import Icon from '../Icon/Icon';

export interface LightBoxProps {
  children: React.ReactNode;
  onClose: () => void;
  dataTestid?: string;
}

const LightBox: React.FC<LightBoxProps> = ({
  children,
  onClose,
  dataTestid = 'lightbox',
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Close lightbox when clicking outside or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when lightbox is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [onClose]);

  return (
    <Absolute
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgColor="surface.overlay"
      zIndex={9999}
      data-testid={dataTestid}
    >
      <Flex fullSize align="center" justify="center">
        <div ref={lightboxRef} className="relative max-w-[90vw] max-h-[90vh]">
          {children}
          
          <div 
            className="absolute top-4 right-4 cursor-pointer" 
            onClick={onClose}
            data-testid={`${dataTestid}-close`}
          >
            <Icon name="x-mark" size="8" color="light.primary" />
          </div>
        </div>
      </Flex>
    </Absolute>
  );
};

export default LightBox; 