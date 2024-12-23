<template>
  <div class="overflow-hidden h-screen bg-black flex flex-col">
    <Header />
    <div class="flex-grow overflow-y-scroll max-h-screen text-terminal-green font-noto-mono leading-normal p-2">
      <slot />
    </div>
    <Footer />
  </div>
</template>