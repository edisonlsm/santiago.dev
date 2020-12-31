<template>
  <header class="">
    <div class="flex items-center bg-gray-200">
      <div class="flex-grow text-xl mx-4 my-2">
        <span>Edison Santiago</span>
      </div>
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
    </div>
  </header>
</template>
