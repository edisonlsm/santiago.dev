<template>
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
      <MDC :value="line" />
    </li>
    <li>{{ `user@${hostname}` }} > {{ currentInputData }}<span class="blink">█</span></li>
  </ul>
  <input id="terminalInput" v-model="currentInputData" class="bg-white opacity-0" @keypress.enter="enterPressed">
</template>

<script setup lang="ts">
import type { MarkdownParsedContent } from '@nuxt/content';

const i18n = useI18n()
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
  const rawCommand = currentInputData.value;
  currentInputData.value = '';
  terminalLines.value.push('\\> ' + rawCommand);

  if (rawCommand == '') return

  if (rawCommand == 'help') {
    generateHelp();
    return;
  }

  // Look for the command on i18n strings
  const commandStringKey = `commands.${rawCommand}.text`
  const commandText = i18n.t(commandStringKey)

  if (commandText === commandStringKey) {
    // Key not found :(
    terminalLines.value.push(hostname.value + ': command not found: ' + rawCommand)
  }
  else {
    terminalLines.value.push(commandText);
  }
}

async function generateHelp() {
  // Get existing contents
  const contents = await queryContent().locale(i18n.locale.value).find()


  const helpData: {code: string, info: string}[] = [];

  for (var ctt of contents) {
    var mdCtt = ctt as MarkdownParsedContent;
    
    const cmd = {
      code: mdCtt.title!,
      info: mdCtt.description,
    }
    helpData.push(cmd);
  }

  // console.log(contents)
  // console.log(contents.map((c) => c.body))

  // // Get available commands from i18n
  // const keys = Object.keys(i18n.messages.value[i18n.locale.value]['commands']);

  // // For each command, get the info
  // for (var key of keys) {
  //   const cmd = {
  //     code: i18n.t(`commands.${key}.code`),
  //     info: i18n.t(`commands.${key}.info`),
  //   }

  //   helpData.push(cmd);
  // }

  helpData.sort((a, b) => a.code.localeCompare(b.code))

  var outputStr = ''

  for (var data of helpData) {
    outputStr = outputStr + `<br />- **${data.code.toLowerCase()}**: ${data.info}<br />`
  }

  terminalLines.value.push(outputStr)

  // terminalLines.value.push('test\u0009\u00091\u000Atest\u0009\u00092\u000Atesteee\u0009\u00093')

  // console.log(helpData)
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