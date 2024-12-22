<template>
  <div class="flex-grow overflow-y-scroll max-h-screen text-terminal-green font-noto-mono leading-normal p-2" @click="focusTerminalInput">
    <ul class="max-w-prose">
      <li v-for="text in defaultTexts">
        {{ $t(text)}}<br /><br />
      </li>
      <li>{{ $t('typeACommand')}}</li>
      <li>{{ $t('commandList')}}</li>
      <li>> {{ inputData }}<span class="blink">█</span></li>
    </ul>
    <input id="terminalInput" v-model="inputData" class="bg-white opacity-0" @keypress.enter="enterPressed">
  </div>
</template>

<script setup>
const { t } = useI18n()
onMounted(() => {
  focusTerminalInput();
})

const inputData = ref('')

const defaultTexts = computed(() => [
  'hello', 'whoAmI', 'whatIDo', 'currentWork'
])

function focusTerminalInput() {
  document.getElementById('terminalInput').focus();
}

</script>

<style>
  .line-80ch {
    max-width: 80ch;
  }

  .blink {
    -webkit-animation: blink-animation 1s step-end infinite;
    animation: blink-animation 1s step-end infinite;
  }
  @keyframes blink-animation {
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }
  }
  @-webkit-keyframes blink-animation {
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }
  }
</style>