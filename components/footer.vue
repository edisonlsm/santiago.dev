<template>
  <footer class="flex-none bg-dark-grey text-light-grey font-bold p-2 flex justify-between">
    <div>
      <div v-for="(locale, index) in $i18n.locales" :key="locale.code" class="inline-block">
        <!-- Display a pipe between the locales -->
        <span v-if="index > 0" class="px-1">|</span>

        <!-- The selected locale is not clickable -->
        <span v-if="locale.code === $i18n.locale" class="font-bold underline">
          {{ locale.code }}
        </span>
        <span v-else class="cursor-pointer hover:underline" @click="changeLocale(locale.code)">
          {{ locale.code }}
        </span>
      </div>
    </div>
    <div class="flex space-x-2">
      <a v-for="network in socialNetworks" :href="network.url" :key="network.name"
        target="_blank" rel="noopener noreferrer" 
        class="h-6 flex items-center">
          <component class="h-4 w-4 inline-block fill-light-grey hover:fill-white" 
          :is="getSocialNetworkIcon(network.iconName)" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const { setLocale } = useI18n()
  import type { Locale } from '@intlify/core-base'

  const socialNetworks = ref([
    {
      "name": "GitHub",
      "iconName": "github",
      "url": "https://github.com/edisonlsm/"
    },
    {
      "name": "LinkedIn",
      "iconName": "linkedin",
      "url": "https://www.linkedin.com/in/edisonsantiago/"
    },
    {
      "name": "Bluesky",
      "iconName": "bluesky",
      "url": "https://bsky.app/profile/edison.santiago.dev"
    },
    {
      "name": "X",
      "iconName": "x",
      "url": "https://x.com/edisonlsm"
    },
  ])

  const getSocialNetworkIcon = (name: string) => defineAsyncComponent(() => import(`../assets/icons/${name}.svg?component`))

  async function changeLocale(locale: Locale) {
    await setLocale(locale)
    // Reload everything when we change the locale
    await refreshNuxtData()
  }
</script>