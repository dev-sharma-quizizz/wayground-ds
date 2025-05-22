import { useMemo } from 'react';
import type { CommonProps } from '../types';
import { useTheme } from './useTheme';
import { classes } from '../utils/classes';

/**
 * Hook that provides utility functions for working with common component props
 * Similar to the Vue composable useCommon
 */
export default function useCommon() {
  const { theme, device } = useTheme();

  // Create utility functions and memoize them
  const utils = useMemo(() => {
    return {
      /**
       * Get CSS classes for a component based on common props
       * @param props Component props that extend CommonProps
       * @returns A string of CSS classes
       */
      getCommonClasses: (props: CommonProps) => {
        return classes(props, device, theme);
      }
    };
  }, [device, theme]);

  return utils;
} 