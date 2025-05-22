<script setup lang="ts">
import useCommon from '@quizizz-ui/composables/useCommon';
import type {
  AlignSelf, CommonProps, ContentTag,
} from '@quizizz-ui/types';
import ContentTagComponent from '@quizizz-ui/components/ui/ContentTagComponent/ContentTagComponent.vue';
import useDebug from '@quizizz-ui/composables/useDebug';

// Box props extend CommonProps
interface BoxProps extends CommonProps {
  self?: AlignSelf,
  fullWidth?: boolean,
  fullHeight?: boolean,
  fullSize?: boolean,
  as?: ContentTag,
};

const props = withDefaults(defineProps<BoxProps>(), {
  as: 'div',
  grow: undefined,
  shrink: undefined,
  relative: undefined,
  basis: undefined,
  fullWidth: undefined,
  fullHeight: undefined,
  fullSize: undefined,
});

const { css } = useCommon(props);
const { debugClasses } = useDebug();
</script>

<template>
  <ContentTagComponent :as="as" :class="`${css} ${group ? 'group' : ''} ${debugClasses}`" :data-testid="dataTestid">
    <slot />
  </ContentTagComponent>
</template>
