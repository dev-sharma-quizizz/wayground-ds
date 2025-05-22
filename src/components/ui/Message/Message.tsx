import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../Icon/Icon';
import Text from '../../primitive/Text/Text';
import Flex from '../../layouts/Flex/Flex';
import type { IconSize, TextColor, TextVariant } from '../../../types';

export type MessageType = 'error' | 'success' | 'warn' | 'info' | 'action';

export interface MessageProps {
  type?: MessageType;
  size?: 'small' | 'default';
  text: string;
  dataTestid?: string;
}

export const Message: React.FC<MessageProps> = ({
  type = 'error',
  size = 'default',
  text,
  dataTestid = 'message',
}) => {
  const { theme, device } = useTheme();

  // Get color variant based on message type
  const getColorVariant = (): TextColor => {
    switch (type) {
      case 'error': return 'fail';
      case 'success': return 'success';
      case 'warn': return 'warn';
      case 'info': return 'dark.secondary';
      case 'action': return 'action';
      default: return 'fail';
    }
  };

  // Get icon name based on message type
  const getIconName = (): string => {
    switch (type) {
      case 'error': return 'exclamation-circle';
      case 'success': return 'check-circle';
      case 'warn': return 'exclamation-triangle';
      case 'info': return 'info-circle';
      case 'action': return 'info-circle';
      default: return 'exclamation-circle';
    }
  };

  // Get icon size based on component size
  const getIconSize = (): IconSize => {
    if (device === 'desktop') {
      return size === 'small' ? '4' : '5';
    } else {
      return '4';
    }
  };

  // Get text variant based on component size
  const getTextVariant = (): TextVariant => {
    return size === 'small' ? 'content.small.bold' : 'content.base.bold';
  };

  const colorVariant = getColorVariant();
  const iconName = getIconName();
  const iconSize = getIconSize();
  const textVariant = getTextVariant();

  // Since the Text component doesn't have a textColor prop, 
  // we'll use a style to set the text color
  const textStyle: React.CSSProperties = {
    color: getColorStyle(colorVariant)
  };

  return (
    <Flex gap="0.5" align="center">
      <Icon
        data-testid={`${dataTestid}-icon`}
        type="regular"
        size={iconSize}
        name={iconName}
        color={colorVariant}
      />
      <Text
        data-testid={`${dataTestid}-text`}
        textVariant={textVariant}
        className={`text-${colorVariant}`}
      >
        {text}
      </Text>
    </Flex>
  );
};

// Helper function to convert color tokens to actual CSS colors
function getColorStyle(color: TextColor): string {
  switch (color) {
    case 'fail': return '#D9003B';
    case 'success': return '#00A36C';
    case 'warn': return '#FFA602';
    case 'dark.secondary': return '#757575';
    case 'action': return '#6B4EFF';
    default: return '#333333';
  }
}

export default Message; 