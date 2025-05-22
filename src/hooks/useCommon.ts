import { useMemo } from 'react';
import { classes } from '../utils/classes';

import type { AlignSelf, CommonProps } from '../types';

/**
 * React hook that provides utility functions for working with common component props
 */
export default function useCommon() {
  const utils = useMemo(() => {
    return {
      getCommonClasses: (props: CommonProps & {
        fullWidth?: boolean;
        fullHeight?: boolean;
        fullSize?: boolean;
        self?: AlignSelf;
      }) => {
        // Process fullWidth, fullHeight, fullSize
        const additionalClasses = [];
        if (props.fullWidth) additionalClasses.push('w-full');
        if (props.fullHeight) additionalClasses.push('h-full');
        if (props.fullSize) additionalClasses.push('w-full h-full');
        
        // Handle self (align-self)
        if (props.self) {
          const selfMap: Record<AlignSelf, string> = {
            start: 'self-start',
            end: 'self-end',
            center: 'self-center',
            baseline: 'self-baseline',
            stretch: 'self-stretch',
            auto: 'self-auto',
          };
          additionalClasses.push(selfMap[props.self]);
        }
        
        const baseClasses = classes(props);
        return [baseClasses, ...additionalClasses].join(' ').trim();
      }
    };
  }, []);

  return utils;
} 