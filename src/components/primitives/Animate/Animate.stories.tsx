import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Animate, { AnimateRef } from './Animate';
import { ThemeProvider } from '../../../hooks/useTheme';
import Flex from '../../layouts/Flex/Flex';
import Button from '../../ui/Button/Button';
import Image from '../Image/Image';

const meta: Meta<typeof Animate> = {
  component: Animate,
  title: 'Primitives/Animate',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
};

export default meta;
type Story = StoryObj<typeof Animate>;

// Helper function to create a colorful box
const ColorBox = ({ color = '#6B4EFF', size = 80 }) => (
  <div style={{ 
    width: `${size}px`, 
    height: `${size}px`, 
    backgroundColor: color, 
    borderRadius: '8px' 
  }} />
);

// Helper function to create an image element
const ImageElement = ({ src = 'https://picsum.photos/300/200', alt = 'Sample image' }) => (
  <img 
    src={src} 
    alt={alt} 
    style={{ 
      width: '300px', 
      height: '200px', 
      objectFit: 'cover', 
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }} 
  />
);

export const Fade: Story = {
  args: {
    from: { opacity: '0' },
    to: { opacity: '100' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox />
    </Animate>
  ),
};

export const FadeImage: Story = {
  args: {
    from: { opacity: '0' },
    to: { opacity: '100' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1018/600/400" alt="Landscape image fade in" />
    </Animate>
  ),
};

export const Scale: Story = {
  args: {
    from: { scale: '0.5' },
    to: { scale: '1.5' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox color="#00A36C" />
    </Animate>
  ),
};

export const ScaleImage: Story = {
  args: {
    from: { scale: '0.5' },
    to: { scale: '1.2' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1042/500/500" alt="Square image scale" />
    </Animate>
  ),
};

export const Translate: Story = {
  args: {
    from: { translate: '0px, 0px' },
    to: { translate: '100px, 50px' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox color="#D9003B" />
    </Animate>
  ),
};

export const TranslateImage: Story = {
  args: {
    from: { translate: '0px, 0px' },
    to: { translate: '100px, 0px' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1027/400/600" alt="Portrait image translate" />
    </Animate>
  ),
};

export const Rotate: Story = {
  args: {
    from: { rotate: '0' },
    to: { rotate: '360' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox color="#FFA602" />
    </Animate>
  ),
};

export const RotateImage: Story = {
  args: {
    from: { rotate: '0' },
    to: { rotate: '360' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1042/500/500" alt="Square image rotate" />
    </Animate>
  ),
};

export const Combined: Story = {
  args: {
    from: { opacity: '0', scale: '0.5', rotate: '0' },
    to: { opacity: '100', scale: '1.5', rotate: '360' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox color="#0B99FE" />
    </Animate>
  ),
};

export const CombinedImage: Story = {
  args: {
    from: { opacity: '0', scale: '0.5', rotate: '0' },
    to: { opacity: '100', scale: '1.2', rotate: '360' },
    duration: 2000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1018/600/400" alt="Landscape image combined animation" />
    </Animate>
  ),
};

export const Loop: Story = {
  args: {
    from: { rotate: '0' },
    to: { rotate: '360' },
    duration: 2000,
    loop: true,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox />
    </Animate>
  ),
};

export const LoopImage: Story = {
  args: {
    from: { rotate: '0' },
    to: { rotate: '360' },
    duration: 3000,
    loop: true,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1036/200/200" alt="Small image loop" />
    </Animate>
  ),
};

export const MultiState: Story = {
  args: {
    states: [
      { opacity: '0', translate: '0px, 0px' },
      { opacity: '100', translate: '100px, 0px' },
      { opacity: '100', translate: '100px, 100px' },
      { opacity: '100', translate: '0px, 100px' },
      { opacity: '0', translate: '0px, 0px' },
    ],
    duration: 5000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ColorBox color="#D9003B" />
    </Animate>
  ),
};

export const MultiStateImage: Story = {
  args: {
    states: [
      { opacity: '0', translate: '0px, 0px', scale: '0.5' },
      { opacity: '100', translate: '100px, 0px', scale: '1' },
      { opacity: '100', translate: '100px, 100px', scale: '1.2' },
      { opacity: '100', translate: '0px, 100px', scale: '1' },
      { opacity: '0', translate: '0px, 0px', scale: '0.5' },
    ],
    duration: 5000,
    autoStart: true,
  },
  render: (args) => (
    <Animate {...args}>
      <ImageElement src="https://picsum.photos/id/1018/600/400" alt="Landscape image multi-state animation" />
    </Animate>
  ),
};

// Use a wrapper to trigger animations manually
const ManualControlWrapper = (args: any) => {
  const animateRef = useRef<AnimateRef>(null);
  
  const handlePlay = () => {
    animateRef.current?.startAnimation();
  };
  
  const handleReverse = () => {
    animateRef.current?.reverseAnimation();
  };
  
  return (
    <Flex direction="col" gap="4" align="center">
      <Animate 
        {...args} 
        ref={animateRef}
        autoStart={false}
      >
        <ImageElement src="https://picsum.photos/id/1042/500/500" alt="Square image with manual controls" />
      </Animate>
      
      <Flex gap="4">
        <Button title="Play" onClick={handlePlay} />
        <Button title="Reverse" onClick={handleReverse} />
      </Flex>
    </Flex>
  );
};

export const ManualControl: Story = {
  args: {
    from: { scale: '1', opacity: '100' },
    to: { scale: '1.5', opacity: '0' },
    duration: 1000,
  },
  render: (args) => <ManualControlWrapper {...args} />,
};

// Example with animatePresence for enter/exit animations
const AnimatePresenceWrapper = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <Flex direction="col" gap="4" align="center">
      <Flex gap="4">
        <Button title="Toggle" onClick={() => setIsVisible(!isVisible)} />
      </Flex>
      
      {isVisible && (
        <Animate
          from={{ opacity: '0', scale: '0.5' }}
          to={{ opacity: '100', scale: '1' }}
          duration={1000}
          animatePresence={true}
        >
          <ImageElement 
            src="https://picsum.photos/id/1018/600/400" 
            alt="Landscape image with animate presence" 
          />
        </Animate>
      )}
    </Flex>
  );
};

export const AnimatePresence: Story = {
  render: () => <AnimatePresenceWrapper />,
};

// Example showing Image animation with default values
export const AnimatedImage: Story = {
  render: () => (
    <Animate
      from={{ opacity: '0', scale: '0.8' }}
      to={{ opacity: '100', scale: '1' }}
      duration={1000}
      easing="ease-out"
      autoStart={true}
    >
      <Image 
        src="https://picsum.photos/id/1018/600/400"
        alt="Mountain landscape"
        width={'64' as any}
        height={'40' as any}
        rounded={'md' as any}
        border={'1 dark.tertiary' as any}
      />
    </Animate>
  ),
};

// Example showing multiple animations in sequence
export const SequentialImageAnimations: Story = {
  render: () => {
    // We're using multiple Animate components nested to create a sequence
    return (
      <Animate
        from={{ opacity: '0' }}
        to={{ opacity: '100' }}
        duration={800}
        autoStart={true}
      >
        <Animate
          from={{ scale: '0.7' }}
          to={{ scale: '1' }}
          duration={1200}
          delay={300}
          autoStart={true}
        >
          <Animate
            from={{ translate: '0px, 20px' }}
            to={{ translate: '0px, 0px' }}
            duration={1000}
            delay={500}
            easing="ease-out"
            autoStart={true}
          >
            <Image 
              src="https://picsum.photos/id/1042/500/500"
              alt="Sequential animations"
              width={'48' as any}
              height={'48' as any}
              rounded={'lg' as any}
              border={'1 dark.tertiary' as any}
            />
          </Animate>
        </Animate>
      </Animate>
    );
  },
}; 