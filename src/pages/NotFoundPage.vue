<script setup lang="ts">
import PagePlaceholder from '@/components/ui/PagePlaceholder.vue'
</script>

<template>
  <PagePlaceholder
    index="404"
    eyebrow="Not found"
    title="页面不存在"
    description="你访问的页面可能已被移动，或者地址输入有误。"
    action-to="/"
    action-label="返回首页"
  />
</template>
