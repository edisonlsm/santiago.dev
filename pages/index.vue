<template>
  <div class="flex flex-col min-h-full dark mode-dark bg-white dark:bg-black">
    <Header class="flex-shrink-0 w-full inline-block" />
    <div class="flex-grow w-full h-full bg-white dark:bg-black prose dark:prose-dark p-6" @click="focusTerminalInput">
      <article>
        <nuxt-content
          :document="currentDocument"
        />
      </article>
      <ul v-for="(line, index) of terminalLines" :key="index">
        <li><p>$ {{ line }}</p></li>
      </ul>
      <ul>
        <li>
          <p>
            $ {{ inputData }}<span class="blink">█</span>
          </p>
        </li>
      </ul>
      <input id="terminalInput" v-model="inputData" class="bg-white opacity-0" @keypress.enter="enterPressed">
    </div>
    <Footer class="flex-shrink-0 w-full inline-block" />
  </div>
</template>

<script>
export default {
  async fetch () {
    this.currentDocument = await this.$content(`${this.$nuxt.context.app.i18n.locale}`, 'about').fetch()

    const skills = await this.$content(`${this.$nuxt.context.app.i18n.locale}`, 'skills', { text: true }).fetch()

    this.terminalLines = skills.text.split('\n')
  },
  data () {
    return {
      inputData: '',
      terminalLines: [],
      currentDocument: null
    }
  },
  methods: {
    focusTerminalInput () {
      document.getElementById('terminalInput').focus()
    },
    enterPressed () {
      const command = this.inputData

      // Clear the input variable
      this.inputData = ''

      if (command === '') {
        // Command is empty, this means a new line

        // Add a new line to terminal output
        this.terminalLines.push(command)

        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight)
      } else if (command === 'clear' || command === 'limpar') {
        // Clear the console
        this.terminalLines = []
      } else if (command === 'exit' || command === 'sair') {
        window.location = 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
      } else {
        // Try to load a markdown file with the name of the command
        this.$content(`${this.$nuxt.context.app.i18n.locale}`, command, { text: true })
          .fetch()
          .then((content) => {
            // Found file! Show it's content on the terminal
            this.terminalLines = content.text.split('\n')
          })
          .catch(() => {
            // Error: File not found for command

            // Add a new line to terminal output with the command
            this.terminalLines.push(command)

            // Add a new line to terminal output with an error message
            this.terminalLines.push(window.location.host + ': command not found: ' + command)

            // Scroll to the bottom of the page
            window.scrollTo(0, document.body.scrollHeight)
          })
      }
    }
  }
}
</script>

<style>
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
