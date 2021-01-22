<template>
  <div class="flex flex-col min-h-full dark mode-dark bg-white dark:bg-black">
    <Header class="flex-shrink-0 w-full inline-block" />
    <div class="flex-grow w-full h-full bg-white dark:bg-black">
      <article class="prose dark:prose-dark about m-6">
        <nuxt-content
          :document="about"
        />
      </article>
      <article class="prose dark:prose-dark prose-lg skills m-6">
        <nuxt-content
          :document="skills"
        />
      </article>
    </div>
    <Footer class="flex-shrink-0 w-full inline-block" />
  </div>
</template>

<script>
function insertNewLine (document) {
  // Create a new line at the bottom of the "console"

  // Create the new li element with the p inside it
  const p = document.createElement('p')
  const pText = document.createTextNode('$ ')
  p.appendChild(pText)
  const li = document.createElement('li')
  li.appendChild(p)

  // Get the "blink" span (the indicator)
  const blink = document.getElementsByClassName('skills')[0].querySelector('.blink')

  // Remove it from the current element
  blink.remove()

  // Add the indicator to the new p tag
  p.appendChild(blink)

  // Find the "skills" nuxt-content wrapper and the ul inside it
  const ul = document.getElementsByClassName('skills')[0].querySelector('ul')

  // Add the new list item to the list
  ul.appendChild(li)

  // Scroll to the bottom of the page
  window.scrollTo(0, document.body.scrollHeight)
}

export default {
  async asyncData (context) {
    const { $content, app } = context

    const about = await $content(`${app.i18n.locale}`, 'about').fetch()
    const skills = await $content(`${app.i18n.locale}`, 'skills').fetch()

    return {
      about, skills
    }
  },
  mounted () {
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 8) {
        // BACKSPACE pressed

        // Avoid browser navigating back
        event.preventDefault()

        // Find the "skills" nuxt-content wrapper and the ul inside it
        const ul = this.document.getElementsByClassName('skills')[0].querySelector('ul')

        // Get the p for the last list-item
        const pNodes = ul.querySelectorAll('p')
        const p = pNodes[pNodes.length - 1]

        if (p.firstChild.data.length > 2) {
          // If the line is larger than two chars this means we have something written on it
          // (The line always have at least two chars, the "$" and the space)
          // Remove the last character
          p.firstChild.data = p.firstChild.data.slice(0, -1)
        }
      }
    })

    window.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        // ENTER pressed
        insertNewLine(document)
      } else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
        // Pressed key is a char
        const char = String.fromCharCode(event.keyCode)

        // Find the "skills" nuxt-content wrapper and the ul inside it
        const ul = this.document.getElementsByClassName('skills')[0].querySelector('ul')

        // Get the p for the last list-item
        const pNodes = ul.querySelectorAll('p')
        const p = pNodes[pNodes.length - 1]

        // Add the character to it
        p.firstChild.data += char
      }
    })
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
