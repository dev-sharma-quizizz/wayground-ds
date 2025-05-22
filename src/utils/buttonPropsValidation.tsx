import type { ButtonVariant } from '../types';

interface UnsupportedProps {
  key: string;
  value: false | string[];
  defaultValue?: string;
}

export const SuperNotAllowedVariants = ['submit', 'reset'];

export const unsupportedImmersiveShadowButton: UnsupportedProps[] = [
  {
    key: 'isSuper',
    value: false,
  },
  {
    key: 'variant',
    value: ['tertiary', 'outline', 'super', 'link-action', 'link-dark', 'link-light', 'danger', 'link'],
    defaultValue: 'primary',
  },
];

export const unsupportedImmersiveButton: UnsupportedProps[] = [
  {
    key: 'isSuper',
    value: false,
  },
  {
    key: 'variant',
    value: ['tertiary', 'outline', 'super', 'link-action', 'link-dark', 'link-light'],
    defaultValue: 'primary',
  },
];

/**
 * Validates button properties based on the provided theme and unsupported properties.
 * Returns an error string if an unsupported property or value is found.
 *
 * @param theme - The current theme
 * @param unsupportedImmersive - List of unsupported properties in immersive theme
 * @param unsupportedAdmin - List of unsupported properties in admin theme
 * @param props - Button component properties
 * @param unsupportedValue - Optional unsupported button variant
 * @returns Error string if invalid, empty string if valid
 */
export function validateButtonProps(
  theme: string,
  unsupportedImmersive: UnsupportedProps[],
  unsupportedAdmin: UnsupportedProps[],
  props: Record<string, any>,
  unsupportedValue?: ButtonVariant,
): string {
  if (theme === 'immersive') {
    // Check for unsupported properties in immersive theme
    for (const arg of unsupportedImmersive) {
      if (arg.value === false && props[arg.key]) {
        return `Argument "${arg.key}" is not supported in immersive theme`;
      }
      if (Array.isArray(arg.value) && unsupportedValue && arg.value.includes(unsupportedValue)) {
        return `${arg.key} ${unsupportedValue} is not supported in immersive theme`;
      }
    }
  } else {
    // Check for unsupported properties in admin theme
    for (const arg of unsupportedAdmin) {
      if (arg.value === false && props[arg.key]) {
        return `Argument "${arg.key}" is not supported in admin theme`;
      }
      if (Array.isArray(arg.value) && unsupportedValue && arg.value.includes(unsupportedValue)) {
        return `${arg.key} ${unsupportedValue} is not supported in admin theme`;
      }
    }
  }

  return '';
}

/**
 * Validates and modifies button properties for Storybook based on the provided theme and unsupported properties.
 * Removes unsupported properties and modifies values if needed.
 *
 * @param theme - The current theme as a string
 * @param unsupportedImmersive - List of unsupported properties in immersive theme
 * @param unsupportedAdmin - List of unsupported properties in admin theme
 * @param args - Arguments representing button properties
 * @param unsupportedValue - Unsupported button variant
 * @returns Modified args object
 */
export function validateStoryButtonProps(
  theme: string,
  unsupportedImmersive: UnsupportedProps[],
  unsupportedAdmin: UnsupportedProps[],
  args: Record<string, any>,
  unsupportedValue: ButtonVariant,
): Record<string, any> {
  const newArgs = { ...args };
  let error = '';

  if (theme === 'immersive') {
    for (const arg of unsupportedImmersive) {
      if (arg.value === false) {
        delete newArgs[arg.key];
      }
      if (Array.isArray(arg.value) && arg.value.includes(unsupportedValue)) {
        if (arg.defaultValue) {
          newArgs.variant = arg.defaultValue;
        }
        error = `${arg.key} ${unsupportedValue} is not supported in immersive theme`;
      }
    }
  } else {
    for (const arg of unsupportedAdmin) {
      if (arg.value === false) {
        delete newArgs[arg.key];
      }
      if (Array.isArray(arg.value) && arg.value.includes(unsupportedValue)) {
        if (arg.defaultValue) {
          newArgs.variant = arg.defaultValue;
        }
        error = `${arg.key} ${unsupportedValue} is not supported in admin theme`;
      }
    }
  }

  if (error) {
    console.error(error);
  }

  return newArgs;
} 