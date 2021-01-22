<template>
  <div class="flex flex-col min-h-full dark mode-dark bg-white dark:bg-black">
    <Header class="flex-shrink-0 w-full inline-block" />
    <div class="flex-grow w-full h-full bg-white dark:bg-black prose dark:prose-dark m-6" @click="focusTerminalInput">
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
// function insertNewLine (document) {
//   // Create a new line at the bottom of the "console"

//   // Create the new li element with the p inside it
//   const p = document.createElement('p')
//   const pText = document.createTextNode('$ ')
//   p.appendChild(pText)
//   const li = document.createElement('li')
//   li.appendChild(p)

//   // Get the "blink" span (the indicator)
//   const blink = document.getElementsByClassName('skills')[0].querySelector('.blink')

//   // Remove it from the current element
//   blink.remove()

//   // Add the indicator to the new p tag
//   p.appendChild(blink)

//   // Find the "skills" nuxt-content wrapper and the ul inside it
//   const ul = document.getElementsByClassName('skills')[0].querySelector('ul')

//   // Add the new list item to the list
//   ul.appendChild(li)

//   // Scroll to the bottom of the page
//   window.scrollTo(0, document.body.scrollHeight)
// }

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
  mounted () {
    // window.addEventListener('keydown', function (event) {
    //   if (event.keyCode === 8) {
    //     // BACKSPACE pressed

    //     // Avoid browser navigating back
    //     event.preventDefault()

    //     // Find the "skills" nuxt-content wrapper and the ul inside it
    //     const ul = this.document.getElementsByClassName('skills')[0].querySelector('ul')

    //     // Get the p for the last list-item
    //     const pNodes = ul.querySelectorAll('p')
    //     const p = pNodes[pNodes.length - 1]

    //     if (p.firstChild.data.length > 2) {
    //       // If the line is larger than two chars this means we have something written on it
    //       // (The line always have at least two chars, the "$" and the space)
    //       // Remove the last character
    //       p.firstChild.data = p.firstChild.data.slice(0, -1)
    //     }
    //   }
    // })

    // window.addEventListener('keypress', function (event) {
    //   if (event.keyCode === 13) {
    //     // ENTER pressed
    //     insertNewLine(document)
    //   } else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
    //     // Pressed key is a char
    //     const char = String.fromCharCode(event.keyCode)

    //     // Find the "skills" nuxt-content wrapper and the ul inside it
    //     const ul = this.document.getElementsByClassName('skills')[0].querySelector('ul')

    //     // Get the p for the last list-item
    //     const pNodes = ul.querySelectorAll('p')
    //     const p = pNodes[pNodes.length - 1]

    //     // Add the character to it
    //     p.firstChild.data += char
    //   }
    // })
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
    },
    async loadTerminalContent (name) {
      const terminalContent = await this.$content(`${this.$nuxt.context.app.i18n.locale}`, name, { text: true }).fetch()

      this.terminalLines = terminalContent.text.split('\n')
    }
  }
}
</script>

<style>
  .terminal {
    vertical-align: bottom;
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
