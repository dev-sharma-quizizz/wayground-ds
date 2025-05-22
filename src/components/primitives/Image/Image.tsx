import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Absolute from '../../layouts/Absolute/Absolute';
import Flex from '../../layouts/Flex/Flex';
import Icon from '../../ui/Icon/Icon';
import FixedSize from '../../layouts/FixedSize/FixedSize';
import LightBox from '../../ui/LightBox/LightBox';
import type { Sizing, BorderRadiusShorthand as AppBorderRadius, BorderShorthand as AppBorder, BGColor as AppBGColor } from '../../../types';
// Later we can implement LightBox component too
// import LightBox from '../../ui/LightBox/LightBox';

// For component's internal use
export type ImageSize = '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '56' | '64' | '72' | '80' | '96';
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type IconSize = '3' | '4' | '5' | '6' | '8' | '10' | '12' | '14';

export interface ImageProps {
  src: string;
  alt: string;
  dataTestid?: string;
  width?: Sizing;
  height?: Sizing;
  bgColor?: AppBGColor;
  rounded?: AppBorderRadius;
  border?: AppBorder;
  objectFit?: ObjectFit;
  interactive?: boolean;
  icon?: string;
  iconSize?: IconSize;
  shrink?: boolean;
  lazy?: boolean;
  expandable?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  dataTestid = 'image',
  width,
  height,
  bgColor,
  rounded,
  border,
  objectFit,
  interactive = false,
  icon,
  iconSize,
  shrink,
  lazy = false,
  expandable = false,
  onClick,
}) => {
  const { theme, device } = useTheme();
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [showInteraction, setShowInteraction] = useState(false);
  const [showLightBox, setShowLightBox] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  // Handle image loading
  const loadImage = () => {
    if (!imgRef.current) return;
    
    if (imgRef.current.complete) {
      setIsLoaded(true);
    }
  };

  // Handle intersection observer for lazy loading
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsInViewport(true);
    }
  };

  // Attach intersection observer for lazy loading
  const attachObserver = () => {
    if (lazy && !isLoaded && !isInViewport && imgContainerRef.current && intersectionObserver.current) {
      intersectionObserver.current.observe(imgContainerRef.current);
    }
  };

  // Initialize intersection observer on mount
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });
    
    loadImage();
    
    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, []);

  // Attach observer when the container ref is set
  useEffect(() => {
    attachObserver();
  }, [imgContainerRef.current]);

  // Handle src changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  // Add interaction event listeners
  useEffect(() => {
    const element = imgContainerRef.current;
    
    if (interactive && !expandable && element) {
      const handleInteractionEnter = () => {
        setShowInteraction(true);
      };
      
      const handleInteractionLeave = () => {
        setShowInteraction(false);
      };
      
      element.addEventListener('mouseenter', handleInteractionEnter);
      element.addEventListener('mouseleave', handleInteractionLeave);
      
      return () => {
        element.removeEventListener('mouseenter', handleInteractionEnter);
        element.removeEventListener('mouseleave', handleInteractionLeave);
      };
    }
  }, [interactive, expandable]);

  // Handle image click for expandable images
  const handleImageClick = (e: React.MouseEvent) => {
    if (expandable) {
      setShowLightBox(true);
    }
    if (onClick) {
      onClick(e);
    }
  };

  // Close lightbox
  const handleCloseClick = () => {
    setShowLightBox(false);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    setHasError(true);
  };

  const imageTestId = `${dataTestid}-image`;
  const loadingImageTestId = `${dataTestid}-image-loading`;

  // Object fit class
  const objectFitClass = objectFit ? `object-${objectFit}` : '';

  return (
    <FixedSize
      ref={imgContainerRef}
      group
      relative
      width={width}
      height={height}
      border={border}
      hoverBorderColor={expandable ? 'action.solid' : undefined}
      rounded={rounded}
      overflow="hidden"
      shrink={shrink}
      bgColor={bgColor}
    >
      {/* Interactive overlay */}
      {interactive && showInteraction && (
        <Absolute 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          bgColor="surface.overlay" 
          cursor="pointer"
        >
          <div onClick={onClick}>
            <Flex fullSize align="center" justify="center">
              {icon && <Icon name={icon} size={iconSize} color="light.primary" />}
            </Flex>
          </div>
        </Absolute>
      )}
      
      {/* Lazy loading placeholder */}
      {lazy && !isInViewport ? (
        <img
          src="https://cf.quizizz.com/image/image-loader.svg"
          alt={alt}
          className={`w-full h-full ${objectFitClass}`}
          data-testid={loadingImageTestId}
        />
      ) : (
        <>
          {/* Main image */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full ${objectFitClass} ${expandable ? 'group-hover:cursor-zoom-in' : ''}`}
            style={{ display: isLoaded ? 'block' : 'none' }}
            data-testid={imageTestId}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={handleImageClick}
          />
          
          {/* Loading placeholder */}
          {!isLoaded && (
            <img
              src="https://cf.quizizz.com/image/image-loader.svg"
              alt={alt}
              className={`w-full h-full ${objectFitClass}`}
              data-testid={loadingImageTestId}
            />
          )}
        </>
      )}
      
      {/* Lightbox */}
      {showLightBox && (
        <LightBox onClose={handleCloseClick}>
          <img
            src={src}
            alt={alt}
            className="object-scale-down h-full"
            data-testid={imageTestId}
            onLoad={handleImageLoad}
          />
        </LightBox>
      )}
    </FixedSize>
  );
};

export default Image; 