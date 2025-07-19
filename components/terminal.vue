<template>
  <ul class="max-w-prose" @click="focusTerminalInput()">
    <li v-for="text in defaultTexts">
      <i18n-t :keypath="text" tag="p" scope="global">
        <template v-if="text === 'currentWork'" v-slot:stapp>
          <a class="underline cursor-pointer hover:text-white" href="https://stapp.studio" target="_blank" rel="noopener noreferrer">Stapp Studio</a>
        </template>
      </i18n-t>
      <br />
    </li>
    <li>{{ $t('typeACommand')}}</li>
    <li>{{ $t('commandList')}}</li>
    <li v-for="line in terminalLines">
      <MDC v-if="typeof line === 'string'" :value="line" />
      <ContentRenderer v-else :value="line" />
    </li>
    <li>{{ `user@${hostname}` }} > {{ currentInputData }}<span class="blink">█</span></li>
  </ul>
  <input id="terminalInput" v-model="currentInputData" class="bg-white opacity-0" @keypress.enter="enterPressed">
</template>

<script setup lang="ts">
import type { MarkdownParsedContent, ParsedContent } from '@nuxt/content';

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

async function enterPressed() {
  const rawCommand = currentInputData.value;
  currentInputData.value = '';
  terminalLines.value.push('\\> ' + rawCommand);

  if (rawCommand == '') return

  if (rawCommand == 'help') {
    generateHelp();
    return;
  }

  if (rawCommand == 'exit') {
    navigateTo('https://www.youtube.com/watch?v=oHg5SJYRHA0', { external:true });
    return;
  }

  try {
    const commandContent = await queryContent(rawCommand).locale(i18n.locale.value).findOne()
    terminalLines.value.push(commandContent as MarkdownParsedContent)
  }
  catch (e) {
    terminalLines.value.push(`${hostname.value}: command not found: ${rawCommand}`)
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

  // Add fixed help and exit commands
  helpData.push({
    code: i18n.t('commands.help.code'),
    info: i18n.t('commands.help.info')
  })
  helpData.push({
    code: i18n.t('commands.exit.code'),
    info: i18n.t('commands.exit.info')
  })

  helpData.sort((a, b) => a.code.localeCompare(b.code))

  var outputStr = i18n.t('availableCommands') + ':<br />'

  for (var data of helpData) {
    outputStr = outputStr + `<br />- ***${data.code.toLowerCase()}***: ${data.info}<br />`
  }

  terminalLines.value.push(outputStr)
}

const terminalLines: Ref<(string | MarkdownParsedContent)[]> = ref([])

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