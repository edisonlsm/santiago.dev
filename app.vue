<template>
  <div class="overflow-hidden h-screen bg-black flex flex-col">
    <Header />
    <Terminal />
    <Footer />
  </div>
</template>

<script setup>
  const { setLocale } = useI18n()
</script>