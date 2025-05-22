import { useMemo } from 'react';

/**
 * Hook that provides debugging utilities for components
 * For debugging layout elements with visual cues
 */
export default function useDebugHook() {
  // In production mode, we don't want to show debug classes
  const isDebugMode = process.env.NODE_ENV === 'development' && (
    typeof localStorage !== 'undefined' && localStorage.getItem('DEBUG_MODE') === 'true'
  );

  const utils = useMemo(() => {
    return {
      debugClasses: isDebugMode ? 'debug-outline' : ''
    };
  }, [isDebugMode]);

  return utils;
} 