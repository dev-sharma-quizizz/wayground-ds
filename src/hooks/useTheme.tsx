import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { Theme, Device, CorporateBranding } from '../types';

// This would normally be imported but we'll declare it here for now
const validateCorporateBranding = (branding: CorporateBranding) => {
  // Validation logic would go here in a real implementation
  return true;
};

const applyCorporateBranding = (branding: CorporateBranding) => {
  // Apply CSS variables for branding
  if (branding.bgColor) {
    document.documentElement.style.setProperty('--qfw-branding-color-default', branding.bgColor);
  }
  if (branding.hoverBgColor) {
    document.documentElement.style.setProperty('--qfw-branding-color-hover', branding.hoverBgColor);
  }
  if (branding.activeBgColor) {
    document.documentElement.style.setProperty('--qfw-branding-color-pressed', branding.activeBgColor);
  }
  if (branding.textColor) {
    document.documentElement.style.setProperty('--qfw-branding-color-text', branding.textColor);
  }
  if (branding.backgroundShades?.primary) {
    document.documentElement.style.setProperty('--qfw-branding-color-background', branding.backgroundShades.primary);
  }
  if (branding.backgroundShades?.dark) {
    document.documentElement.style.setProperty('--qfw-branding-color-background-dark', branding.backgroundShades.dark);
  }
};

interface ThemeContextType {
  theme: Theme;
  device: Device;
  corporateBranding?: CorporateBranding;
  setTheme: (theme: Theme) => void;
  setDevice: (device: Device) => void;
  setCorporateBranding: (branding?: CorporateBranding) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'admin',
  device: 'desktop',
  setTheme: () => { },
  setDevice: () => { },
  setCorporateBranding: () => { },
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export interface ThemeProviderProps {
  initialTheme?: Theme;
  initialDevice?: Device;
  initialCorporateBranding?: CorporateBranding;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme = 'admin',
  initialDevice = 'desktop',
  initialCorporateBranding,
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [device, setDevice] = useState<Device>(initialDevice);
  const [corporateBranding, setCorporateBranding] = useState<CorporateBranding | undefined>(initialCorporateBranding);

  // Handle corporate branding changes
  useEffect(() => {
    if (corporateBranding) {
      if (theme === 'admin') {
        console.error('Corporate branding is not supported with admin theme');
        setCorporateBranding(undefined);
      } else {
        if (validateCorporateBranding(corporateBranding)) {
          applyCorporateBranding(corporateBranding);
        }
      }
    }
  }, [corporateBranding, theme]);

  // Apply corporate branding on initial render if provided
  useEffect(() => {
    if (initialCorporateBranding && theme !== 'admin') {
      setCorporateBranding(initialCorporateBranding);
    }
  }, [initialCorporateBranding]);

  return (
    <ThemeContext.Provider value={{
      theme,
      device,
      corporateBranding,
      setTheme,
      setDevice,
      setCorporateBranding
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme; 