<template>
  <div class="flex-grow overflow-y-scroll max-h-screen text-terminal-green font-noto-mono leading-normal p-2" @click="focusTerminalInput">
    <ul class="max-w-prose">
      <li v-for="text in defaultTexts">
        <i18n-t :keypath="text" tag="p" scope="global">
          <template v-if="text === 'currentWork'" v-slot:stapp>
            <a class="underline cursor-pointer" href="https://stapp.studio" target="_blank" rel="noopener noreferrer">Stapp Studio</a>
          </template>
        </i18n-t>
        <br />
      </li>
      <li>{{ $t('typeACommand')}}</li>
      <li>{{ $t('commandList')}}</li>
      <li v-for="line in terminalLines">
        {{ line }}
      </li>
      <li>{{ `user@${hostname}` }} > {{ currentInputData }}<span class="blink">█</span></li>
    </ul>
    <input id="terminalInput" v-model="currentInputData" class="bg-white opacity-0" @keypress.enter="enterPressed">
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const hostname = computed(() => useRequestURL().hostname)

onMounted(() => {
  focusTerminalInput();
})

const defaultTexts = computed(() => [
  'hello', 'whoAmI', 'whatIDo', 'currentWork'
])

const currentInputData = ref('')

function focusTerminalInput() {
  document.getElementById('terminalInput')?.focus();
}

function enterPressed() {
  const command = currentInputData.value;
  currentInputData.value = '';
  terminalLines.value.push('> ' + command);

  if (command == '') return

  terminalLines.value.push(hostname.value + ': command not found: ' + command)
}

const terminalLines: Ref<string[]> = ref([])

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