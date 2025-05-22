import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import FixedSize from '../../layouts/FixedSize/FixedSize';
import Flex from '../../layouts/Flex/Flex';
import Icon from '../Icon/Icon';
import TextInput from '../TextInput/TextInput';
import IconButton from '../IconButton/IconButton';
import type { Sizing } from '../../../types';

export interface SearchBarProps {
  size?: 'small' | 'default' | 'large';
  placeholder?: string;
  disabled?: boolean;
  variant?: 'default' | 'other';
  value?: string;
  defaultValue?: string;
  dataTestid?: string;
  width?: Sizing;
  showClear?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SearchBarRef {
  focus: () => void;
  blur: () => void;
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  (
    {
      size = 'default',
      placeholder = '',
      disabled = false,
      variant = 'default',
      value,
      defaultValue = '',
      dataTestid = 'searchbar',
      width = 'auto',
      showClear = false,
      autoFocus = false,
      onChange,
      onClear,
      onSubmit,
      onKeyDown,
    },
    ref
  ) => {
    const { theme, device } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose focus and blur methods
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      }
    }));

    // Update internal state when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    // Get height based on size
    const getHeight = () => {
      if (device === 'desktop') {
        switch (size) {
          case 'small': return '8';
          case 'large': return '14';
          default: return '10';
        }
      } else {
        switch (size) {
          case 'small': return '8';
          case 'large': return '12';
          default: return '10';
        }
      }
    };

    // Get background color
    const getBgColor = () => {
      if (disabled) {
        return 'surface.disabled';
      }
      return variant === 'default' ? 'surface.primary' : 'surface.secondary';
    };

    // Get border color
    const getBorderColor = () => {
      if (disabled) {
        return 'dark';
      }
      return isFocused ? 'action.solid' : 'dark';
    };

    // Get icon color
    const getIconColor = () => {
      return disabled ? 'dark.tertiary' : 'dark.primary';
    };

    // Get padding
    const getPaddingLeft = () => {
      switch (size) {
        case 'small': return '0 0 0 2';
        case 'large': return '0 0 0 6';
        default: return '0 0 0 3';
      }
    };

    const getPaddingRight = () => {
      switch (size) {
        case 'small': return '0 2 0 0';
        case 'large': return '0 6 0 0';
        default: return '0 3 0 0';
      }
    };

    // Get text variant
    const getTextVariant = () => {
      switch (size) {
        case 'small': return 'content.small.bold';
        case 'large': return 'heading.base';
        default: return 'content.base.bold';
      }
    };

    // Get placeholder variant
    const getPlaceholderVariant = () => {
      switch (size) {
        case 'small': return 'content.small';
        case 'large': return 'heading.base';
        default: return 'content.base';
      }
    };

    // Get icon size
    const getIconSize = () => {
      switch (size) {
        case 'small': return '4';
        case 'large': return '6';
        default: return '5';
      }
    };

    // Handle input change
    const handleInputChange = (newValue: string) => {
      setInputValue(newValue);
      onChange?.(newValue);
    };

    // Handle clear button click
    const handleClearClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setInputValue('');
      onChange?.('');
      onClear?.();
      inputRef.current?.focus();
    };

    // Handle key down event
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Enter') {
        onSubmit?.();
      }
    };

    return (
      <FixedSize
        data-testid="searchbar-wrapper"
        height={getHeight()}
        borderSize="1"
        width={width}
        borderColor={getBorderColor()}
        rounded="full"
        overflow="hidden"
        bgColor={getBgColor()}
        padding={getPaddingLeft()}
      >
        <Flex
          gap="2"
          fullHeight
          align="center"
        >
          {/* Search icon */}
          <Icon
            data-testid="searchbar-icon"
            size={getIconSize()}
            color={getIconColor()}
            name="search"
            type="solid"
          />

          {/* Input */}
          <Flex fullSize align="center" justify="center" padding={getPaddingRight()}>
            <TextInput
              ref={inputRef}
              value={inputValue}
              placeholder={placeholder}
              data-testid={dataTestid}
              disabled={disabled}
              placeholderVariant={getPlaceholderVariant()}
              textVariant={getTextVariant()}
              autoFocus={autoFocus}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleInputChange}
            />
          </Flex>

          {/* Clear button */}
          {showClear && inputValue && (
            <Flex margin="0 2 0 0">
              <IconButton
                icon="xmark"
                size="sm"
                variant="link-dark"
                dataTestid={`${dataTestid}-clear`}
                onClick={handleClearClick}
              />
            </Flex>
          )}
        </Flex>
      </FixedSize>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar; 