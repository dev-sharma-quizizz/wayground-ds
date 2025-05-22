import React from 'react';
import type { Device, Gap, Theme } from '../../../types';

export interface ColumnsContextType {
  count: number;
  gap: Gap;
  device: Device;
  theme: Theme;
}

export const ColumnsContext = React.createContext<ColumnsContextType | null>(null); 