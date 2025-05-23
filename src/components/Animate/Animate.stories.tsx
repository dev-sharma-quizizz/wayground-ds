import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Animate, { AnimateRef } from './Animate';
import Button from '../ui/Button/Button';

const meta: Meta<typeof Animate> = {
  title: 'Animate',
  component: Animate,
  tags: ['autodocs'],
  args: {
    duration: 1000,
    delay: 0,
    loop: false,
    autoStart: false,
    easing: 'ease-in-out',
    direction: 'alternate',
    fill: 'forwards',
    bezier: '0.25, 0.75, 0.5, 1',
    states: [
      {
        translate: '0 0',
        rotate: '0',
      },
      {
        translate: '400px 0',
        rotate: '360',
      },
    ],
  },
  argTypes: {
    duration: {
      control: 'number',
    },
    delay: {
      control: 'number',
    },
    easing: {
      control: 'select',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
    },
    bezier: {
      control: 'text',
    },
    fill: {
      control: 'select',
      options: ['forwards', 'backwards', 'both', 'none'],
    },
    direction: {
      control: 'select',
      options: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    },
  },
};

export default meta;

const ImageBox = () => (
  <div className="w-20 h-20 bg-surface-action-faded rounded-lg p-1">
    <img
      src="https://cf.quizizz.com/image/chandan.png"
      alt="chandan"
      className="w-full h-full rounded-base"
    />
  </div>
);

export const Default: StoryFn<typeof Animate> = (args) => {
  const [show, setShow] = useState(false);
  const animateRef = useRef<AnimateRef>(null);
  const presenceAnimateRef = useRef<AnimateRef>(null);

  const loopProps = {
    ...args,
    loop: true,
    autoStart: true,
    animatePresence: false,
  };

  const triggerBasedProps = {
    ...args,
    autoStart: false,
    animatePresence: false,
  };

  const presenceProps = {
    ...args,
    autoStart: false,
    animatePresence: false,
  };

  const handlePlay = () => {
    // eslint-disable-next-line storybook/context-in-play-function
    animateRef.current?.play();
  };

  const handleReverse = () => {
    // eslint-disable-next-line storybook/context-in-play-function
    animateRef.current?.reverse();
  };

  const handleToggle = () => {
    if (show) {
      // When hiding, play reverse animation then remove element
      // eslint-disable-next-line storybook/context-in-play-function
      presenceAnimateRef.current?.reverse();
      setTimeout(() => {
        setShow(false);
      }, args.duration || 1000);
    } else {
      // When showing, add element then play forward animation
      setShow(true);
      setTimeout(() => {
        // eslint-disable-next-line storybook/context-in-play-function
        presenceAnimateRef.current?.play();
      }, 10); // Small delay to ensure element is in DOM
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold">Animate (loop)</h2>
        <Animate {...loopProps}>
          <ImageBox />
        </Animate>
      </div>

      <hr />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold">Animate (trigger based)</h2>
        <Animate {...triggerBasedProps} ref={animateRef}>
          <ImageBox />
        </Animate>
        <div className="flex gap-2 items-center">
          <Button 
            title="Play Animation"
            onClick={handlePlay}
            variant="primary"
            size="md"
          />
          <Button 
            title="Reverse Animation"
            onClick={handleReverse}
            variant="primary"
            size="md"
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold">Animate Presence (conditional)</h2>
        <Animate {...presenceProps} ref={presenceAnimateRef}>
          {show && <ImageBox />}
        </Animate>
        <div className="flex gap-2 items-center">
          <Button 
            title={show ? 'Hide' : 'Show'}
            onClick={handleToggle}
            variant="primary"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}; 