<template>
  <header class="header">
    <div class="flex items-center bg-gray-200 pt-2-safe pb-2">
      <span class="ml-6 logo">Σ$_</span>
      <div class="flex-grow ml-4 mr-6">
        <span class="text-2xl">Edison Santiago</span>
        <span class="text-md inline-block">
          {{ $t('career-description') }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .header {
    font-family: 'Source Code Pro', monospace;
  }

  .logo {
    /* color: #27FE14; */
    /* background-color: black; */
    display: inline-block;
    border: 0.1em solid;
    border-top-width: 0.30em;
    border-radius: 0.25em;
    padding: 0.05em 0.25em 0.25em 0.25em;
  }
</style>
