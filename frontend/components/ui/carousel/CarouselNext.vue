<script setup lang="ts">
import type {WithClassAsProps} from './interface'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-vue-next'
import {useCarousel} from './useCarousel'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn(
      'touch-manipulation h-8 w-8 ml-[12px] rounded-full p-0',
      orientation === 'horizontal'
        ? 'right-[10%] top-[100%] -translate-y-1/2'
        : '-bottom-12 left-[500%] -translate-x-[50%] rotate-90',
      props.class,
    )"
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
