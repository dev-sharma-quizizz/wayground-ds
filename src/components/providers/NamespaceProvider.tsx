import React, { ReactNode } from 'react';
import { ThemeProvider } from '../../hooks/useTheme';
import type { Theme, Device, CorporateBranding } from '../../types';

interface NamespaceProviderProps {
  theme?: Theme;
  device?: Device;
  corporateBranding?: CorporateBranding;
  children: ReactNode;
}

/**
 * NamespaceProvider provides theme context to the component tree.
 * It handles theme, device, and corporate branding if provided.
 * 
 * Note: Corporate branding is only supported with immersive theme.
 */
const NamespaceProvider: React.FC<NamespaceProviderProps> = ({
  theme = 'admin',
  device = 'desktop',
  corporateBranding,
  children,
}) => {
  // Corporate branding is only applied in the ThemeProvider
  return (
    <ThemeProvider
      initialTheme={theme}
      initialDevice={device}
      initialCorporateBranding={corporateBranding}
    >
      {children}
    </ThemeProvider>
  );
};

export default NamespaceProvider; 