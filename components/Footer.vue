<template>
  <footer class="footer w-full flex items-center justify-between bg-gray-200">
    <div class="flex-shrink-0 uppercase text-xs mx-4">
      <template v-for="(locale, index) in $i18n.locales">
        <!-- Display a pipe between the locales -->
        <span v-if="index > 0" :key="'divider' + locale.code" class="px-1">|</span>

        <!-- The current locale is underlined and not clickable -->
        <span
          v-if="locale.code === $i18n.locale"
          :key="'name' + locale.code"
          class="font-bold"
        >
          <!-- Show the short name at small screens -->
          <div class="inline-block">
            {{ locale.code }}
          </div>
        </span>

        <!-- Available locales are shown as links -->
        <a
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :href="switchLocalePath(locale.code)"
          class="underline"
        >
          <!-- <a
            v-if="locale.code !== $i18n.locale"
            :key="locale.code"
            :href="#"
            @click.prevent.stop="$i18n.setLocale(locale.code)"
          > -->
          <!-- Show the short name at small screens -->
          <div class="inline-block">
            {{ locale.code }}
          </div>
        </a>
      </template>
    </div>
    <div class="flex-grow mx-4 my-2 text-right">
      <a v-for="social in socials" :key="social.id" :href="social.link" class="inline-block ml-2" target="_blank">
        <font-awesome-icon class="fa-1x" :icon="[social.faIconGroup, social.faIconName]" />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      socials: [
        {
          id: 1,
          link: 'mailto:edisonluizsm@gmail.com',
          faIconGroup: 'fas',
          faIconName: 'envelope-square'
        },
        {
          id: 2,
          link: 'https://www.linkedin.com/in/edisonsantiago',
          faIconGroup: 'fab',
          faIconName: 'linkedin'
        },
        {
          id: 3,
          link: 'https://github.com/edisonlsm',
          faIconGroup: 'fab',
          faIconName: 'github'
        },
        {
          id: 4,
          link: 'https://twitter.com/edisonlsm',
          faIconGroup: 'fab',
          faIconName: 'twitter'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .footer {
    font-family: 'Source Code Pro', monospace;
  }
</style>
