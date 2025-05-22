<script setup lang="ts">
import { computed, ref } from 'vue';
import Flex from '@quizizz-ui/components/layouts/Flex/Flex.vue';
import Floating from '@quizizz-ui/components/layouts/Floating/Floating.vue';
import useButton from '@quizizz-ui/composables/useButton';
import type { IButton, PremiumIconSize } from '@quizizz-ui/components/ui/types';
import { SuperNotAllowedVariants } from '@quizizz-ui/components/ui/types';
import Icon from '@quizizz-ui/components/ui/Icon/Icon.vue';
import PremiumIcon from '@quizizz-ui/components/ui/PremiumIcon/PremiumIcon.vue';
import Text from '@quizizz-ui/components/primitives/Text/Text.vue';
import Box from '@quizizz-ui/components/primitives/Box/Box.vue';
import { classes } from '@quizizz-ui/utils/classes';
import useDebug from '@quizizz-ui/composables/useDebug';

const props = withDefaults(defineProps<IButton>(), {
  title: 'Button',
  size: 'md',
  variant: 'primary',
  lIconType: 'solid',
  tIconType: 'solid',
  disabled: false,
  isSuper: false,
  superVariant: 'superBox',
  loading: false,
  fullWidth: false,
  maxLength: -1,
});

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

const wrapper = ref(null);

defineExpose({ wrapper });

const {
  bgColor,
  hoverBgColor,
  activeBgColor,
  borderColor,
  textColor,
  textSize,
  iconSize,
  padding,
  buttonHeight,
  textDecoration,
  textDecorationColor,
  hoverTextDecorationColor,
  activeTextDecorationColor,
} = useButton('Button', props);

const css = computed(() => {
  if (props.disabled) {
    return classes({
      bgColor: bgColor.value,
      hoverBgColor: hoverBgColor.value,
      padding: padding.value,
      height: buttonHeight.value,
    });
  }
  return classes({
    bgColor: bgColor.value,
    hoverBgColor: hoverBgColor.value,
    activeBgColor: activeBgColor.value,
    padding: padding.value,
    borderColor: borderColor.value,
    borderSize: '1',
    height: buttonHeight.value,
  });
});

const shouldShowSuperIcon = computed<boolean>(() => !SuperNotAllowedVariants.includes(props.variant) && props.isSuper);

const buttonTitle = computed<string>(() => {
  if (props.maxLength > 0) {
    return props.title.length > props.maxLength ? `${props.title.slice(0, props.maxLength)}..` : props.title;
  }
  return props.title;
});

const { debugClasses } = useDebug();
</script>

<template>
  <button
    ref="wrapper"
    :type="type"
    :aria-label="ariaLabel ? ariaLabel : title"
    :class="`${css} ${debugClasses} min-w-20 rounded flex items-center justify-center focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 shrink-0 focus-visible:outline-ds-lilac-500-40 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${loading ? 'relative pointer-events-none' : ''} ${fullWidth ? 'w-full' : ''}`"
    :disabled="disabled"
    :data-testid="dataTestid"
    @click="(ev) => disabled || emit('click', ev)"
  >
    <Floating v-if="loading" position="center">
      <Icon
        type="regular"
        name="sync"
        :color="textColor"
        :size="iconSize"
        :fixedWidth="false"
        animate="spin"
      />
    </Floating>
    <Box :visibility="loading ? 'invisible' : 'visible'">
      <Flex align="center" justify="center" :gap="size === 'lg' ? '2' : '1'">
        <Icon
          v-if="Boolean(lIcon)"
          :type="lIconType"
          :name="lIcon ?? ''"
          :color="textColor"
          :size="iconSize"
          :fixedWidth="false"
        />
        <Text
          data-testid="button-text"
          :textVariant="textSize"
          :textColor="textColor"
          :textDecoration="textDecoration"
          :textDecorationColor="textDecorationColor"
          :hoverTextDecorationColor="hoverTextDecorationColor"
          :activeTextDecorationColor="activeTextDecorationColor"
          textUnderlineOffset="4"
          wrap="nowrap"
          select="none"
        >
          {{ buttonTitle }}
        </Text>
        <Icon
          v-if="Boolean(tIcon) && !isSuper"
          :type="tIconType"
          :name="tIcon ?? ''"
          :color="textColor"
          :size="iconSize"
          :fixedWidth="false"
        />
        <Box
          v-if="shouldShowSuperIcon"
        >
          <PremiumIcon :size="iconSize as PremiumIconSize" :variant="superVariant" />
        </Box>
      </Flex>
    </Box>
  </button>
</template>
