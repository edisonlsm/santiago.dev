<template>
  <div class="flex-grow overflow-y-scroll max-h-screen text-terminal-green font-noto-mono leading-normal p-2">
      <ul>
        <li v-for="text in defaultTexts"><p class="block leading-normal">> {{ text }}</p></li>
      </ul>
    </div>
</template>

<script setup>
const { t } = useI18n()

const defaultTexts = computed(() => [
  t('hello'),
  '',
  t('whoAmI'),
  '',
  t('whatIDo'),
])
</script>
