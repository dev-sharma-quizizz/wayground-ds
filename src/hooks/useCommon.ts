import { useMemo } from 'react';
import { classes, tokens } from '../utils/classes';
import type { CommonProps } from '../types';

/**
 * React hook that provides utility functions for working with common component props
 */
export default function useCommon() {
  const utils = useMemo(() => {
    return {
      getCommonClasses: (props: CommonProps) => {
        return classes(props as tokens);
      }
    };
  }, []);

  return utils;
} 