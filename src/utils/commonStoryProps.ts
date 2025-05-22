import { BorderRadiusValues, MarginValues, ShadowValues, bgColors, borderColors } from '../types';

const commonStoryProps = {
  margin: {
    control: {
      type: 'select',
    },
    options: MarginValues,
    defaultValue: '4',
  },
  padding: {
    control: {
      type: 'select',
    },
    options: MarginValues,
    defaultValue: '4',
  },
  bgColor: {
    control: {
      type: 'select',
    },
    options: bgColors.map(color => color.path),
    defaultValue: 'default',
  },
  rounded: {
    control: {
      type: 'select',
    },
    options: BorderRadiusValues,
    defaultValue: 'none',
  },
  borderSize: {
    control: {
      type: 'select',
    },
    options: ['0', '1', '2'],
    defaultValue: '0',
  },
  borderColor: {
    control: {
      type: 'select',
    },
    options: borderColors.map(color => color.path),
    defaultValue: 'default',
  },
  shadow: {
    control: {
      type: 'select',
    },
    options: ShadowValues,
    defaultValue: 'none',
  },
  visibility: {
    control: {
      type: 'select',
    },
    options: ['visible', 'invisible', 'collapse'],
  },
  cursor: {
    control: {
      type: 'select',
    },
    options: ['pointer', 'default', 'text'],
  },
  overflow: {
    control: {
      type: 'select',
    },
    options: ['visible', 'hidden', 'scroll', 'auto'],
  },
  grow: {
    control: 'boolean',
  },
  shrink: {
    control: 'boolean',
  },
  borderPosition: {
    control: {
      type: 'select',
    },
    options: ['all', 'top', 'right', 'bottom', 'left', 'x', 'y'],
  },
};

export default commonStoryProps;