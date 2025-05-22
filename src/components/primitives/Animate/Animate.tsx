import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, ReactNode, useLayoutEffect } from 'react';
import { v4 as uuid } from 'uuid';

// Types - match exactly with Vue version
type Opacity = string; // "0" to "100"
type Scale = string; // "0.5", "1", "2", etc.
type Rotate = string; // "0", "90", "180", etc.
type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;

interface AnimateProperties {
  opacity?: Opacity;
  translate?: string; // "10px, 20px" or "10px 20px"
  scale?: Scale;
  rotate?: Rotate;
}

export interface AnimateProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  from?: AnimateProperties;
  to?: AnimateProperties;
  states?: AnimateProperties[];
  loop?: boolean;
  fill?: 'forwards' | 'backwards' | 'both' | 'none';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  easing?: Easing;
  bezier?: string;
  iterations?: number;
  autoStart?: boolean;
  animatePresence?: boolean;
}

export interface AnimateRef {
  startAnimation: () => void;
  reverseAnimation: () => void;
}

const isServer = () => typeof window === 'undefined';

/**
 * Animate component for animating a single child element
 * Exact port of the Vue implementation
 */
const Animate = forwardRef<AnimateRef, AnimateProps>(({
  children,
  duration = 1000,
  delay = 0,
  from,
  to,
  states,
  loop = false,
  fill = 'forwards',
  direction = 'normal',
  easing = 'linear',
  bezier,
  iterations = 1,
  autoStart = true,
  animatePresence = false
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerId] = useState<string>(() => !isServer() ? uuid() : '');
  const animationRef = useRef<Animation | null>(null);
  const childEntered = useRef<boolean>(false);
  
  // Validate animation properties
  useEffect(() => {
    if (!states && (!from || !to)) {
      console.error('Animate component must have either states or from and to props');
      return;
    }

    if (React.Children.count(children) !== 1) {
      console.error('Animate component must have exactly one child');
      return;
    }
  }, [states, from, to, children]);

  // Get the node to animate
  const getNodeToAnimate = (): Element | null => {
    if (isServer() || !containerRef.current) return null;
    return containerRef.current.children[0];
  };

  // Get animation properties from an AnimateProperties object
  const getProperties = (params: AnimateProperties | undefined): Record<string, any> => {
    if (!params) return {};

    const properties: Record<string, any> = {};

    if (params.opacity) {
      properties.opacity = `${Number.parseInt(params.opacity, 10) / 100}`;
    }

    let transform = '';

    if (params.scale) {
      transform = `scale(${params.scale}) `;
    }

    if (params.translate) {
      const parts = params.translate.includes(',') 
        ? params.translate.split(',') 
        : params.translate.split(' ');
      const [x, y] = parts.map(i => i.trim());
      transform += `translate(${x}, ${y}) `;
    }

    if (params.rotate) {
      transform += `rotate(${params.rotate}deg) `;
    }

    if (transform) {
      properties.transform = transform.trim();
      properties.transformOrigin = 'center';
    }

    return properties;
  };

  // Get the keyframe states for the animation
  const getKeyframeStates = (): Record<string, any>[] => {
    if (!states) {
      return [from, to].map(state => getProperties(state));
    }
    return states.map(state => getProperties(state));
  };

  // Get the easing property for the animation
  const getEasingProperty = (): string => {
    if (bezier) {
      return `cubic-bezier(${bezier})`;
    }
    return easing;
  };

  // Play the animation
  const playAnimation = (node: Element, isReverse = false) => {
    if (!node) return;
    
    const keyframeStates = getKeyframeStates();
    
    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.cancel();
    }
    
    // Create and start the animation
    const animation = node.animate(keyframeStates, {
      duration,
      iterations: loop ? Infinity : iterations,
      easing: getEasingProperty(),
      delay,
      fill,
      direction: isReverse ? 'reverse' : direction,
    });
    
    animationRef.current = animation;
    
    return animation;
  };

  // Handle enter animation with animatePresence
  const handleEnter = (node: Element) => {
    if (animatePresence && !childEntered.current) {
      playAnimation(node);
      childEntered.current = true;
    }
  };

  // Expose methods
  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      const node = getNodeToAnimate();
      if (node) playAnimation(node);
    },
    reverseAnimation: () => {
      const node = getNodeToAnimate();
      if (node) playAnimation(node, true);
    }
  }));

  // Auto-start animation on mount
  useLayoutEffect(() => {
    if (!isServer() && autoStart && !animatePresence) {
      const node = getNodeToAnimate();
      if (node) {
        playAnimation(node);
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [autoStart, animatePresence]);

  // Handle animate presence
  useEffect(() => {
    if (!isServer() && animatePresence) {
      const node = getNodeToAnimate();
      if (node) {
        handleEnter(node);
      }
    }
    
    return () => {
      if (animatePresence && animationRef.current) {
        const node = getNodeToAnimate();
        if (node) {
          const animation = playAnimation(node, true);
          if (animation && typeof animation.finished !== 'undefined') {
            animation.finished.then(() => {
              childEntered.current = false;
            });
          }
        }
      }
    };
  }, [animatePresence]);

  // Class added to match Vue's 'contents' class
  return (
    <div id={containerId} ref={containerRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
});

Animate.displayName = 'Animate';

export default Animate; 