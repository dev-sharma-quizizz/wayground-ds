import React, { forwardRef, useEffect, useRef } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { TextVariant } from '../../../types';

export interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  textVariant?: TextVariant;
  placeholderVariant?: TextVariant;
  value?: string;
  defaultValue?: string;
  type?: 'text' | 'email' | 'url' | 'password';
  dataTestid?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      disabled = false,
      maxLength,
      textVariant = 'content.base.bold',
      placeholderVariant = 'content.base',
      value,
      defaultValue = '',
      type = 'text',
      dataTestid = 'text-input',
      readOnly = false,
      autoFocus = false,
      onChange,
      onFocus,
      onBlur,
      onSubmit,
      onKeyDown,
    },
    ref
  ) => {
    const { theme, device } = useTheme();
    const internalRef = useRef<HTMLInputElement | null>(null);

    // Combine external ref with internal ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(internalRef.current);
        } else {
          ref.current = internalRef.current;
        }
      }
    }, [ref]);

    // Auto focus
    useEffect(() => {
      if (autoFocus && internalRef.current) {
        internalRef.current.focus();
      }
    }, [autoFocus]);

    // Handle keydown event
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Enter') {
        onSubmit?.();
      }
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
    };

    // Since we can't easily set text variant classes in React without more complex setup,
    // we'll use inline styles
    const getTextStyle = () => {
      // Basic styles that apply to input
      const styles: React.CSSProperties = {
        outline: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        color: disabled ? '#A1A1A1' : '#333333', // text-ds-dark-100 or text-ds-dark-300
        fontSize: device === 'desktop' ? '1rem' : '1.125rem',
        fontWeight: value && value.length > 0 ? 600 : 400, // bold for text, regular for placeholder
      };

      return styles;
    };

    return (
      <input
        ref={internalRef}
        data-testid={dataTestid}
        placeholder={placeholder}
        type={type}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        readOnly={readOnly}
        autoFocus={autoFocus}
        style={{
          ...getTextStyle(),
          textOverflow: 'ellipsis',
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput; 