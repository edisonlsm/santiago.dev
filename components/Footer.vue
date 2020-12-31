<template>
  <footer class="w-full flex items-center justify-end bg-gray-200">
    <div class="mx-4 my-2">
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
