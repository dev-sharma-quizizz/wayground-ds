import type { Device, Theme } from '../types';

export interface ThemeProp {
  [key: string]: string | number | ThemeProp,
}
export interface BaseDevice {
  admin?: ThemeProp | string | number | boolean,
  immersive?: ThemeProp | string | number | boolean,
}
export interface DesktopOrMobile {
  desktop?: BaseDevice,
  mobile?: BaseDevice,
}

export interface AnyDevice {
  anyDevice: BaseDevice,
}
type Config = AnyDevice | (DesktopOrMobile & Partial<Record<'desktop' | 'mobile', BaseDevice>>);

// TODO: Add type-safety here for the options object.

/**
 * This function essentially is a lookup function that takes in deviceType, theme variables
 * in any nested order and returns value as per the params passed to it
 *
 * example:
 * sizeTva = tva({
 *   desktop: {
 *     admin: {
 *       size: {
 *         DEFAULT: 10,
 *         small: 5,
 *         medium: 10,
 *         large: 15,
 *       },
 *     }
 *   }
 * }
 * });
 *
 * sizeTva({ device: 'desktop', theme: 'admin', size: 'small' }) // returns 5
 * sizeTva({ device: 'desktop', theme: 'admin', size: 'medium' }) // returns 10
 * sizeTva({ device: 'desktop', theme: 'admin', size: 'large' }) // returns 15
 *
 * @param t - Theme configuration object that contains the device, theme and variables
 */
export default function tva(t: Config) {
  return function ({ device, theme, ...props }: { device: Device; theme: Theme } & { [key: string]: any }) {
    let currentDevice: {
      [key: string]: any,
    } = {};
    if ('anyDevice' in t) {
      currentDevice = t.anyDevice;
    } else {
      if (!t[device]) {
        throw new Error(`Device ${device} not found`);
      }
      const deviceConfig = t[device];
      if (deviceConfig) {
        currentDevice = deviceConfig;
      }
    }

    let currentTheme: {
      [key: string]: any,
    } = {};

    if (currentDevice.anyTheme) {
      currentTheme = currentDevice.anyTheme;
    } else {
      currentTheme = currentDevice[theme];
    }

    if (typeof currentTheme !== 'object') {
      return currentTheme;
    }

    const root = currentTheme;

    function traverse(obj: any) {
      for (const key in obj) {
        if (typeof props[key] !== 'undefined') {
          const value = obj[key][props[key]];
          if (typeof value !== 'undefined') {
            if (typeof value === 'object') {
              return traverse(value);
            } else {
              return value;
            }
          } else {
            if (typeof obj[key].DEFAULT === 'object') {
              return traverse(obj[key].DEFAULT);
            } else if (typeof obj[key].DEFAULT === 'undefined') {
              throw new TypeError(`No default value found [${key}]`);
            } else {
              return obj[key].DEFAULT;
            }
          }
        }
      }
    }

    return traverse(root);

    // const propConditions = Object.keys(currentTheme);
    // if (propConditions.length === 1) {
    //   const key = propConditions[0];
    //   return currentTheme[key][props[key]];
    // } else {
    //   throw new Error('Use conditionals for multiple conditions');
    // }
  };
}
