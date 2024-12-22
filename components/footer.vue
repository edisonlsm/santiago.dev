  <template>
    <footer class="flex-none bg-dark-grey text-light-grey font-bold p-2 flex justify-between">
      <div>
        <button class="inline-block hover:underline" @click="setLocale('en')">EN</button>
        &nbsp;|&nbsp; 
        <button class="inline-block hover:underline" @click="setLocale('pt')">BR</button>
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

  <script setup>
  const { setLocale } = useI18n()

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

  const getSocialNetworkIcon = (name) => defineAsyncComponent(() => import(`../assets/icons/${name}.svg?component`))
  </script>