import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  icon?: string;
  iconType?: string;
  variant?: 'primary' | 'secondary' | 'fail';
  disabled?: boolean;
  delay?: number;
  showOnLoad?: boolean;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  icon,
  iconType,
  variant = 'primary',
  disabled = false,
  delay = 1,
  showOnLoad = false,
  children,
}) => {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const [arrowStyles, setArrowStyles] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme, device } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (showOnLoad && !disabled) {
      setTimeout(() => {
        setShow(true);
      }, delay * 1000);
    }

    window.addEventListener('wheel', resetPosition);
    window.addEventListener('scroll', resetPosition);
    window.addEventListener('resize', resetPosition);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('wheel', resetPosition);
      window.removeEventListener('scroll', resetPosition);
      window.removeEventListener('resize', resetPosition);
    };
  }, [delay, showOnLoad, disabled]);

  useEffect(() => {
    if (show) {
      resetPosition();
    }
  }, [show, text, position, variant]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        resetPosition();
      }, 0);
    }
  }, [text, variant]);

  const getBgColor = () => {
    switch (variant) {
      case 'primary':
        return 'rgba(0, 0, 0, 0.8)'; // surface.dark.80
      case 'secondary':
        return '#FFFFFF'; // surface.primary
      case 'fail':
        return '#D9003B'; // surface.fail
      default:
        return 'rgba(0, 0, 0, 0.8)';
    }
  };

  const getTextColor = () => {
    if (variant === 'secondary') {
      return '#333333'; // dark.primary
    }
    return '#FFFFFF'; // light.primary
  };

  const getFontSize = () => {
    if (device === 'mobile') {
      return '1rem';
    }
    return '0.875rem';
  };

  const resetPosition = () => {
    if (!containerRef.current || !tooltipRef.current || !show) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const leftCenter = containerRect.left + containerRect.width / 2;
    const topCenter = containerRect.top + containerRect.height / 2;
    
    let tooltipLeft;
    let tooltipTop;
    let arrowStyle: React.CSSProperties = {};

    switch (position) {
      case 'top':
        tooltipLeft = leftCenter - tooltipRect.width / 2;
        tooltipTop = containerRect.top - tooltipRect.height - 12;
        arrowStyle = { bottom: '-8px', left: 'calc(50% - 14px)' };

        // Handle edge cases
        if (tooltipLeft < 0) {
          const adjust = -tooltipLeft;
          tooltipLeft = 0;
          arrowStyle.left = `calc(50% - 14px - ${adjust}px)`;
        } else if (tooltipLeft + tooltipRect.width > window.innerWidth) {
          const adjust = (tooltipLeft + tooltipRect.width) - window.innerWidth;
          tooltipLeft = window.innerWidth - tooltipRect.width;
          arrowStyle.left = `calc(50% - 14px + ${adjust}px)`;
        }
        break;
      
      case 'bottom':
        tooltipLeft = leftCenter - tooltipRect.width / 2;
        tooltipTop = containerRect.bottom + 12;
        arrowStyle = { top: '0px', left: 'calc(50% - 14px)' };

        // Handle edge cases
        if (tooltipLeft < 0) {
          const adjust = -tooltipLeft;
          tooltipLeft = 0;
          arrowStyle.left = `calc(50% - 14px - ${adjust}px)`;
        } else if (tooltipLeft + tooltipRect.width > window.innerWidth) {
          const adjust = (tooltipLeft + tooltipRect.width) - window.innerWidth;
          tooltipLeft = window.innerWidth - tooltipRect.width;
          arrowStyle.left = `calc(50% - 14px + ${adjust}px)`;
        }
        break;
      
      case 'left':
        tooltipLeft = containerRect.left - tooltipRect.width - 12;
        tooltipTop = topCenter - tooltipRect.height / 2;
        arrowStyle = { top: 'calc(50%)', right: '-14px' };

        // Handle edge cases
        if (tooltipTop < 0) {
          const adjust = -tooltipTop;
          tooltipTop = 0;
          arrowStyle.top = `calc(50% - ${adjust}px)`;
        } else if (tooltipTop + tooltipRect.height > window.innerHeight) {
          const adjust = (tooltipTop + tooltipRect.height) - window.innerHeight;
          tooltipTop = window.innerHeight - tooltipRect.height;
          arrowStyle.top = `calc(50% + ${adjust}px)`;
        }
        break;
      
      case 'right':
        tooltipLeft = containerRect.right + 12;
        tooltipTop = topCenter - tooltipRect.height / 2;
        arrowStyle = { top: 'calc(50%)', left: '-14px' };

        // Handle edge cases
        if (tooltipTop < 0) {
          const adjust = -tooltipTop;
          tooltipTop = 0;
          arrowStyle.top = `calc(50% - ${adjust}px)`;
        } else if (tooltipTop + tooltipRect.height > window.innerHeight) {
          const adjust = (tooltipTop + tooltipRect.height) - window.innerHeight;
          tooltipTop = window.innerHeight - tooltipRect.height;
          arrowStyle.top = `calc(50% + ${adjust}px)`;
        }
        break;
      
      default:
        break;
    }

    setStyles({
      top: `${tooltipTop}px`,
      left: `${tooltipLeft}px`,
    });

    setArrowStyles(arrowStyle);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShow(true);
      timeoutRef.current = null;
    }, delay * 1000);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setShow(false);
  };

  const getRotation = () => {
    switch (position) {
      case 'top': return 'rotate(0deg)';
      case 'left': return 'rotate(-90deg)';
      case 'bottom': return 'rotate(180deg)';
      case 'right': return 'rotate(90deg)';
      default: return 'rotate(0deg)';
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      
      {mounted && show && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: 'fixed',
            zIndex: 9999,
            display: 'flex',
            gap: '4px',
            minWidth: '6rem',
            maxWidth: '15rem',
            borderRadius: '0.25rem',
            padding: '1rem',
            pointerEvents: 'none',
            backgroundColor: getBgColor(),
            color: getTextColor(),
            fontSize: getFontSize(),
            fontWeight: 600,
            border: variant === 'secondary' ? '1px solid #333333' : 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            ...styles,
          }}
          data-testid="tooltip"
        >
          {icon && (
            <span style={{ fontSize: '16px', display: 'inline-block' }}>
              ●{/* Icon placeholder */}
            </span>
          )}
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
          <div
            style={{
              position: 'absolute',
              transform: getRotation(),
              transformOrigin: 'top',
              ...arrowStyles,
            }}
          >
            <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5858 7.34655L9.74904 4.1821C8.36542 2.63866 7.67361 1.86694 6.86628 1.31506C6.1505 0.825759 5.37015 0.465186 4.55386 0.246574C3.63316 0 2.65479 0 0.698068 0H27.3019C25.3452 0 24.3668 0 23.4461 0.246574C22.6299 0.465186 21.8495 0.825759 21.1337 1.31506C20.3264 1.86694 19.6346 2.63866 18.251 4.18211L15.4142 7.34655C14.6332 8.21782 13.3668 8.21782 12.5858 7.34655Z"
                fill={getBgColor()}
              />
              {variant === 'secondary' && (
                <path 
                  d="M27.3019 0.979004C25.2976 0.979004 24.4584 0.985295 23.6796 1.16835C22.9653 1.33623 22.2825 1.61312 21.6562 1.98886C20.9733 2.39859 20.3753 2.97507 18.9581 4.36258L16.1213 7.13977C14.9497 8.28675 13.0503 8.28674 11.8787 7.13977L9.04193 4.36258C7.62466 2.97506 7.02672 2.39859 6.34378 1.98886C5.71748 1.61312 5.03466 1.33623 4.32041 1.16835C3.54157 0.985295 2.70239 0.979004 0.698068 0.979004H0V0H0.698068C2.65479 0 3.63315 0 4.55386 0.2164C5.37015 0.408258 6.1505 0.724707 6.86628 1.15413C7.67361 1.63847 8.36542 2.31576 9.74904 3.67032L12.5858 6.44751C13.3668 7.21216 14.6332 7.21216 15.4142 6.44751L18.251 3.67032C19.6346 2.31576 20.3264 1.63847 21.1337 1.15413C21.8495 0.724707 22.6299 0.408258 23.4461 0.2164C24.3668 0 25.3452 0 27.3019 0H28V0.979004H27.3019Z" 
                  fill="white" 
                />
              )}
            </svg>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip; 