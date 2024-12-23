<template>
  <ContentRenderer :value="data">
    <template #empty>
      Not found.
    </template>
  </ContentRenderer>
</template>

<script setup lang="ts">
const i18n = useI18n()
const route = useRoute()

const { data } = await useAsyncData('content', () => queryContent(route.path).locale(i18n.locale.value).findOne())
</script>