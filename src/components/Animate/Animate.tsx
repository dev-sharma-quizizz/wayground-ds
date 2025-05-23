import React, { useEffect, useRef, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { v4 as uuid } from 'uuid';

type Opacity = string;
type Scale = string | number;
type Rotate = string | number;
type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

interface AnimateProperties {
  opacity?: Opacity;
  translate?: string;
  scale?: Scale;
  rotate?: Rotate;
}

interface AnimateProps {
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
  onEnter?: () => void;
  onLeave?: () => void;
}

export interface AnimateRef {
  play: () => void;
  reverse: () => void;
}

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
  animatePresence = false,
  onEnter,
  onLeave,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = useRef<string>(uuid());
  const animationRef = useRef<Animation | null>(null);

  const getNodeToAnimate = (): Element | null => {
    if (typeof document === 'undefined') return null;
    const parent = document.getElementById(containerId.current);
    return parent?.children[0] || null;
  };

  const getProperties = (params: AnimateProperties | undefined) => {
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
      const [x, y] = params.translate.split(params.translate.includes(',') ? ',' : ' ').map(i => i.trim());
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

  const playAnimation = (node: Element, reverse = false) => {
    const keyframeStates = states 
      ? states.map(state => getProperties(state))
      : [getProperties(from), getProperties(to)];

    const easingProperty = bezier ? `cubic-bezier(${bezier})` : easing;

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    requestAnimationFrame(() => {
      animationRef.current = node.animate(keyframeStates, {
        duration,
        iterations: loop ? Infinity : iterations,
        easing: easingProperty,
        delay,
        fill,
        direction: reverse ? 'reverse' : direction,
      });

      if (reverse && onLeave) {
        animationRef.current.onfinish = () => {
          onLeave();
        };
      } else if (!reverse && onEnter) {
        animationRef.current.onfinish = () => {
          onEnter();
        };
      }
    });
  };

  const play = () => {
    const node = getNodeToAnimate();
    if (node) playAnimation(node);
  };

  const reverse = () => {
    const node = getNodeToAnimate();
    if (node) playAnimation(node, true);
  };

  useImperativeHandle(ref, () => ({
    play,
    reverse,
  }));

  useEffect(() => {
    if (!states && (!from || !to)) {
      throw new Error('Animate component must have either states or from and to props');
    }

    const node = getNodeToAnimate();
    if (node && autoStart && !animatePresence) {
      playAnimation(node);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (animatePresence) {
      const node = getNodeToAnimate();
      if (node) {
        if (React.Children.count(children) > 0) {
          playAnimation(node);
        } else {
          playAnimation(node, true);
        }
      }
    }
  }, [children]);

  return (
    <div id={containerId.current} className="contents" ref={containerRef}>
      {children}
    </div>
  );
});

Animate.displayName = 'Animate';

export default Animate; 