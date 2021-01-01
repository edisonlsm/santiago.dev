<template>
  <div class="flex flex-col min-h-full">
    <Header class="flex-shrink-0 w-full inline-block" />
    <div class="flex-grow w-full h-full">
      <article class="prose about m-6">
        <nuxt-content
          :document="about"
        />
      </article>
      <article class="prose prose-lg skills m-6">
        <nuxt-content
          :document="skills"
        />
      </article>
    </div>
    <Footer class="flex-shrink-0 w-full inline-block" />
  </div>
</template>

<script>
export default {
  async asyncData (context) {
    const { $content, app } = context

    const about = await $content(`${app.i18n.locale}`, 'about').fetch()
    const skills = await $content(`${app.i18n.locale}`, 'skills').fetch()

    return {
      about, skills
    }
  }
}
</script>

<style>
  .nuxt-content {
    color: #000;
    font-family: 'Source Code Pro', monospace;
  }

  .about .nuxt-content a {
    text-decoration: none;
    font-weight: inherit;
  }

  .about .nuxt-content a:hover {
    text-decoration: underline;
  }

  .skills .nuxt-content h4 {
    margin-top: 0;
  }

  .skills .nuxt-content a {
    text-decoration: none;
    font-weight: inherit;
  }

  .skills .nuxt-content a:hover {
    text-decoration: underline;
  }

  .skills .nuxt-content p {
    margin-top: 0;
    margin-bottom: 0;
  }

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
